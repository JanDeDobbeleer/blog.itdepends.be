---
categories:
- automation
date: 2016-04-05T00:00:00Z
description: Now that we know what we can use to build our apps, how do we set this
  up?
tags:
- app
- bamboo
- cd
- ci
- cli
- command line
- continuous
- delivery
- integration
- jenkins
- make
- makefile
- powershell
- psake
- store
- uwp
- windows
title: Building Windows Store apps automatically – Part II - Building
url: /building-windows-store-apps-automatically-part-ii-building
---

> This is Part II of "Building Windows Store apps automatically", in case you haven't read <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-i-introduction" target="_blank">Part I</a> yet, please do so before reading this post. The source code of this series can be found on Github.
>
> <a class="github_link" href="https://github.com/JanDeDobbeleer/psake-example" target="_blank" >Source code</a>

So, we now have the files ready to start implementing the tasks. **Like every sane person**, before building my app, I clean the solution. To do this we have to get some help from MSBuild. Visual Studio uses MSBuild 14.0 to build UWP apps so let's use that one as well. As MSBuild is installed on the same location for every machine, I went ahead and referenced it directly. In case you know a cleaner way, let me know, I couldn't find it with my Google skills.

To clean a solution with MSBuild, we have to use the following command:

```shell
msbuild <solution> /p:Configuration=<configuration> p:Platform=<platform> /v:q /t:Clean
```

In the script we need to have access to the solution location and build parameters which we can add using the `Properties` object. To keep our makefile clean and for the sake of re-usability, I added another script called <a href="https://github.com/JanDeDobbeleer/psake-example/blob/master/Build/psakefile-tools.ps1" target="_blank"><code>psakefile-tools.ps1</code></a> where we can add logic that can be used by the different tasks. With all of that combined, the Clean task looks like this:

```powershell
Task Clean {
  Write-Host -Object 'Cleaning solution' -ForegroundColor DarkCyan
  Exec {
    &('C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe') (Get-SolutionPath -solutionName $solutionFileName) /p:Configuration="$configuration" /p:Platform="$build_platform" /v:q /t:Clean
  }
}
```

One of the issues you get when using the MSBuild command out of the box is that even when the command fails, **it would be treated as successful**. To remedy this, the psake team created a helper function called Exec which will throw an error whenever a command fails. You can set a custom error message or even the amount of retries, just take a look at the <a href="https://github.com/psake/psake/blob/master/psake.psm1" target="_blank">source code</a> to see how it works and what's available. The variables used in the Clean task are defined in the `Properties` object, you can take a look at the complete file at the bottom of this post if you need to.

What I also do between cleaning and building the solution is restoring NuGet packages. As the dependencies might have changed, we need to have a way to bring this up-to-date. To do this I added the NuGet executable together with a `NuGet.config` file to the Build folder. Once again this is done to ensure we can decide which version of NuGet to use. In reality I hardly ever change this one, right now it's updated to the latest version. We need the config file to be able to tell NuGet where to find packages. In case you use your own repositories, add them. By default the config file looks like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="nuget.org" value="https://www.nuget.org/api/v2/" />
  </packageSources>
  <activePackageSource>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
  </activePackageSource>
</configuration>
```

The only remaining is to use the NuGet executable and tell it to restore the packages for our solution. It will loop through all the projects and resolve the dependencies found in the project.json files.

```powershell
Task RestorePackages {
  Write-Host -Object 'Start restoring Nuget packages' -ForegroundColor DarkCyan
  $nuget_executable_file_path = $PSScriptRoot + '\NuGet.exe'
  $nuget_config_file_path = $PSScriptRoot + '\NuGet.Config'
  Exec {
    &($nuget_executable_file_path) restore (Get-SolutionPath -solutionName $solutionFileName) -ConfigFile $nuget_config_file_path -NoCache -MSBuildVersion 14
  }
}
```

Awesome. Now we that we can clean our solution and restore the NuGet packages, **building it is just as easy**. We remove the `/t:Clean` option and the solution gets build:

```powershell
Task Build -Depends VerifyBuildProperties, Clean, RestorePackages {
  Write-Host -Object 'Building solution' -ForegroundColor DarkCyan
  Exec {
    &('C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe') (Get-SolutionPath -solutionName $solutionFileName) /p:Configuration="$configuration" /p:Platform="$build_platform" /v:q
  }
}
```

I use the -Depends option to execute `VerifyBuildProperties`, `Clean` and `RestorePackages` before building. To trigger the `Build` task from your Powershell console, type:

```shell
.\psake.ps1 .\psakefile.ps1 Build -properties @{'solutionFileName' = 'Dummy.sln'; 'build_platform' = 'ARM'; 'configuration'  = 'Release'}
```

In case you downloaded the source code and have to temporarily bypass the unsigned script, use this snippet first. I suggest signing the script once you are ready to use it in a production environment.

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

If all went well, you can see the following output:

```shell
PS > .\psake.ps1 .\psakefile.ps1 Build -properties @{'solutionFileName' = 'Dummy.sln'; 'build_platform' = 'ARM'; 'configuration'  = 'Release'}
psake version 4.6.0
Copyright (c) 2010-2014 James Kovacs & Contributors

Executing TestProperties
Executing Clean
Cleaning solution
Microsoft (R) Build Engine version 14.0.25123.0
Copyright (C) Microsoft Corporation. All rights reserved.

Start restoring Nuget packages
Feeds used:
  https://api.nuget.org/v3/index.json

Restoring packages for C:\Users\Jan\Github\psake-example\Dummy.UWP\project.json...
All packages are compatible with UAP,Version=v10.0.
All packages are compatible with UAP,Version=v10.0 (win10-arm).
All packages are compatible with UAP,Version=v10.0 (win10-arm-aot).
All packages are compatible with UAP,Version=v10.0 (win10-x86).
All packages are compatible with UAP,Version=v10.0 (win10-x86-aot).
All packages are compatible with UAP,Version=v10.0 (win10-x64).
All packages are compatible with UAP,Version=v10.0 (win10-x64-aot).

Executing Build
Building solution
Microsoft (R) Build Engine version 14.0.25123.0
Copyright (C) Microsoft Corporation. All rights reserved.

  Resources.System.Linq.Expressions.rd.xml(35): warning : Method 'CreateLambda' within 'System.Linq.Expressions.Expression' could not be found. [C:\Users\Jan\Github\psake-example\Dummy.UWP\Dummy.UWP.cs proj]
  Resources.System.Linq.Expressions.rd.xml(91): warning : Method 'ParameterIsAssignable' within 'System.Linq.Expressions.Expression' could not be found. [C:\Users\Jan\Github\psake-example\Dummy.UWP\Dum my.UWP.csproj]

Build Succeeded!

----------------------------------------------------------------------
Build Time Report
----------------------------------------------------------------------
Name                   Duration
----                   --------
VerifyBuildProperties  00:00:00.0104357
Clean                  00:00:00.2477109
RestorePackages        00:00:01.4792410
Build                  00:00:50.9941667
Total:                 00:00:52.7570575
```

With these tasks defined it is now possible to setup a simple CI instance which builds our solution and provides feedback to the developers. All we have to do is call the `Build` task from a Powershell console and we are good to go.

The entire `psakefile.ps1` now looks like this:

{% gist 6666614e351ffe479fba850777da7334 %}

Join me in <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-iii-continuous-integration" target="_blank">Part III</a> where I will take you into the depths of testing and working towards proper continuous integration.
