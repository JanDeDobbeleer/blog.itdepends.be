---
categories:
- automation
date: 2016-04-06T00:00:00Z
description: Now that we know how we can build our apps, what else do we need for
  Continuous Integration?
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
title: Building Windows Store apps automatically - Part III - Continuous Integration
url: /building-windows-store-apps-automatically-part-iii-continuous-integration
---

> This is Part III of "Building Windows Store apps automatically", in case you haven't read <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-i-introduction" target="_blank">Part I</a> or <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-ii-building" target="_blank">Part II</a> yet, please do so before reading this post. The source code of this series can be found on Github.
>
> <a class="github_link" href="https://github.com/JanDeDobbeleer/psake-example" target="_blank" >Source code</a>

When it comes to unit testing, **the setup has been positively changed for UWP** apps compared to Windows Phone 8.1. We now have the option to run them on the machine instead of the emulator. But for the sake of completeness, and because this information is quite hard to find, if you have a WP 8.1 RT project you still need to maintain, it is possible to run the unit tests from command line. The missing link is that you need a `.runsettings` file which specifies the emulator you want to run the tests on. The one I use in all my projects can be found <a href="https://gist.github.com/JanDeDobbeleer/f09d76ff14375bf66b50043f4c14c309" target="_blank">here</a>, feel free to copy it. The file can be passed to the same command we use for our UWP tests using the `/Settings:<phone.runsettings>` parameter. To run the unit tests, we can complete the Test task as follows:

```powershell
Task Test -Depends VerifyTestProperties {
    $file = Get-AppxPackageLocation -projectName $project_name
    Write-Host -Object "Starting tests with test appx package $file" -ForegroundColor DarkCyan
    $output = (&('C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\CommonExtensions\Microsoft\TestWindow\vstest.console.exe') $file)
    Write-Host $output
    if (!($output -like '*Test Run Successful*')) {
    throw 'Test: Unit test run unsuccessful'
    }
}
```

Just like MSBuild I chose to use the direct path to vstest to execute the command. Beware that when changing your VS version or vstest version you might need to change this to get the same result and behavior. The `Get-AppxPackageLocation` function can be found in the previously mentioned <a href="https://github.com/JanDeDobbeleer/psake-example/blob/master/Build/psakefile-tools.ps1" target="_blank"><code>psakefile-tools.ps1</code></a> file.

Using the example project, this provides the following output:

```shell
PS > .\psake.ps1 .\psakefile.ps1 Test -properties @{'project_name'='Dummy.UWP.Test'}
psake version 4.6.0
Copyright (c) 2010-2014 James Kovacs & Contributors

Executing VerifyTestProperties
Executing Test
Starting tests with test appx package C:\Users\Jan\Github\psake-example\Dummy.UWP.Test\AppPackages\Dummy.UWP.Test_1.0.0.0_x86_Test\Dummy.UWP.Test_1.0.0.0_x86.appx
Microsoft (R) Test Execution Command Line Tool Version 14.0.25123.0 Copyright (c) Microsoft Corporation.  All rights reserved.  Starting test execution, please wait... Passed   FalseShouldBeFalse Passed   TrueShouldBeTrue  Total tests: 2. Passed: 2. Failed: 0. Skipped: 0. Test Run Successful. Test execution time: 0.6511 Seconds

Build Succeeded!

----------------------------------------------------------------------
Build Time Report
----------------------------------------------------------------------
Name                 Duration
----                 --------
VerifyTestProperties 00:00:00.0038352
Test                 00:00:04.3556756
Total:               00:00:04.3624754
```

There are two things we need to be aware of. One is that we need an `x86` compiled version of our app if we want to run the test project. I know this might seem obvious but trust me, **you tend to forget that**. Especially since UWP apps do not have the `AnyCPU` configuration available to them. Secondly, the certificate that comes with the unit test project has to be a trusted Root Certificate to allow the tests to run. Double click on the .pfx certificate and import it (no password). When you have to select the Certificate Store, choose "Place all certificates in the following store" and press Browse. In the list, select "Trusted Root Certification Authorities", OK, Next and Finish. In case you do not want to include the .pfx files in your source code, leave them on the build server and copy them to the correct directories before building the app.

One of the nice things about the output a unit test run provides is that certain CI tools allow you to import this. In Bamboo you can see those in the build result with a nice overview of the test names and execution result, as well as a count of how many.

Running the WACK is almost identical, only that we have to use `appcert.exe` and an elevated command prompt. Our build agents on Bamboo all run elevated so this is solved by default, but be aware of this when setting up your CI instance.

```powershell
Task Validate {
    $reportOutput = $PSScriptRoot + '\report.xml'
    if (Test-Path $reportOutput)
    {
        Remove-Item $reportOutput
    }
    $file = Get-AppxPackageLocation -projectName $project_name
    Exec {
        &('C:\Program Files (x86)\Windows Kits\10\App Certification Kit\appcert.exe') reset
    }
    Write-Host 'Starting Validation of appx package ' + $file -ForegroundColor DarkCyan
    return Exec {
        &('C:\Program Files (x86)\Windows Kits\10\App Certification Kit\appcert.exe') test -appxpackagepath $file -reportoutputpath $reportOutput
    }
}
```

To start, any previous output that was left on the server has to be deleted. Every WACK run creates a nice little output file that holds the test results which **will fail the WACK run** if the specified file can already be found on that location. Also, as a safety measure `appcert.exe` is reset before starting another run. The output is quite extensive, for once I will not provide the output, you can try this yourself by typing the following command in an elevated command prompt.

```shell
.\psake.ps1 .\psakefile.ps1 Validate -properties @{"solutionFileName"="Dummy.sln";"build_platform"="x86";"configuration"="Release";"project_name"="Dummy.UWP";}
```


Now that we have building and testing configured, it is possible to set up a complete CI instance with just one Powershell line in our CI tool. In addition to that, building the app has been decentralized from Visual Studio and can be run by everyone from the command line to provide the same result. In <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-iv-continuous-delivery" target="_blank">Part IV</a>, we will take it one step further and work towards Continuous Delivery.
