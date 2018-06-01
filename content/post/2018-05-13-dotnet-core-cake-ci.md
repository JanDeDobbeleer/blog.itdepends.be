---
date: 2018-05-13T18:59:11+02:00
categories:
- dev
date: 2018-05-15T00:00:00Z
description: Playing with a setup to get started with DotNet Core 2.0, met with Cake, Appveyor and Resharper through CLI.
tags:
- automation
- csharp
- cake
- cakebuild
- core
- 2.0
- dotnet
- ci
- cli
- console
- deployment
- nuget
- package
- windows
- vscode
- resharper
title: "Dotnet Core served with a slice of Cake"
url: /dotnet-core-cake
---

While preparing slides for an introduction into DevOps I was about to give to a bunch of knowledge eager .NET developers, I was looking to build a sample project to illustrate a nice setup to start with. DotNet Core was a given, with it's great CLI interface and ability to run everywhere, **the choice was obvious**. But when it came to build tools, I felt that the ones I knew (psake, fake), could easily startle people new to this whole _build .NET code outside of Visual Studio_ kind of thing. There was one kid on the block which had been on my list to look at for quite a while, and  you know **how much I love sidetracking** and spending way too much time exploring exciting new stuff!

Long story short, I fell in love with Cake. Compared to other build automation tools, it comes with a lot of nice first- and third-party integrations, reducing the need for boilerplate code. Before, I made use of **heavily customized PowerShell scripts** for versioning and uploading of artifacts and test results, Cake comes with all of that out of the box. Another advantage, if the feature you're looking isn't available, it's easily extensible. All the wins \0/.

So, what would my ideal setup look like? Well, we need a few things when it comes to a nice CI setup. First, I want all the build logic to be managed from the source code, no dependencies in the GUI as it easily becomes a burden to maintain and switch context. On the plus side, we want to be able to run it locally as well as on our build agent, and Cake will help us achieve exactly that. Secondly, here's a list of stuff I'm looking for that Cake should handle for me:

- Split the build logic in tasks
- Group tasks to allow different types of builds
- Provide standard build functionality (clean, restore, build)
- Restore NuGet packages
- Enable static code analysis and linting
- Run unit tests and upload coverage

Let's have a look at each of those.

## Split the build logic in tasks

To get started with Cake, you can make use of the <a href="https://cakebuild.net/docs/tutorials/setting-up-a-new-project" target="_blank">bootstrappers</a>. There are two versions, one for Windows, and one for Unix systems. I added both in my sample project, just make sure to use the correct line endings on each platform, or **go for LF everywhere** (yeah, I said it). If you're using Visual Studio Code, feel free to have a look at the <a href="https://marketplace.visualstudio.com/items?itemName=cake-build.cake-vscode" target="_blank">Cake extension</a>, Gary Ewan Park even made <a href="https://www.youtube.com/playlist?list=PL84yg23i9GBg7_7an5Qbo0Qllg-l2e-q-" target="_blank">accompanying videos</a> to explain its capabilities.

After installing a bootstrapper, make sure to pin the Cake version. You can do so by adding a file at `tools/packages.config` with the following content.

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
    <package id="Cake" version="0.27.2" />
</packages>

```

 With all this in place we have the following files, other than the project files:

```shell
.
├── build.ps1
├── build.sh
├── tools
|   ├── packages.config
```

Remember, we've got a DotNet Core project set up, in case you don't have one, feel free to clone the <a href="https://github.com/JanDeDobbeleer/dotnet-core-sample" target"_blank">sample project</a> to follow along. The purpose of the bootstrapper files `build.ps1` and `build.sh` is to be able to **resolve all dependencies**, including Cake, and not having to worry about any of that. You can have a look at the source to see what they do, but the file we're really interested in is `build.cake`.

Create the `build.cake` file which will contain al our build logic from now on. The Cake website provides a nice <a href="https://cakebuild.net/docs/tutorials/setting-up-a-new-project" target="_blank">getting started</a> sample, so let's build from there.

```csharp
var target = Argument("target", "Default");

Task("Default")
  .Does(() =>
{
  Information("Hello World!");
});

RunTarget(target);
```

You can see we've met the first requirement. We have the ability to define tasks that can contain whatever logic we need. Written entirely in C#, this is a huge advantage and **reduces the startup cost** as a .NET developer. The task called `Default` is the one that runs when no parameters are defined. You can immediately see what it does by using the bootstrapper in your CLI tool of choice: `./build.ps1` (but seriously, use <a href="https://conemu.github.io/" target="_blank">ConEmu</a>). The output looks like this:

```shell
Preparing to run build script...
Running build script...

========================================
Default
========================================
Hello World!

Task                          Duration
--------------------------------------------------
Default                       00:00:00.0136945
--------------------------------------------------
Total:                        00:00:00.0136945
```

## Group tasks to allow different types of builds

Using Cake, it's easy to group a few tasks as one. Let's say we want to split our Hello world task into two meaningful ones and assign the combination as the `Default`.
We can define separate tasks and have `Default` depend on both of them.

```csharp
var target = Argument("target", "Default");

Task("Hello")
  .Does(() =>
{
  Information("Hello");
});

Task("World")
  .Does(() =>
{
  Information("World");
});

Task("Default")
  .IsDependentOn("Hello")
  .IsDependentOn("World");

RunTarget(target);

```

When you run this using `./build.ps1`, you can see both tasks being executed. Now that we understand the basics, it's time to implement the actual logic for our DotNet Core app.

## Provide standard build functionality (clean, restore, build)

Cake provides support for DotNet Core via a built-in third party <a href="https://cakebuild.net/dsl/dotnetcore/" target="_blank">plugin</a>. To clean a project, you can make use of `DotNetCoreClean`, but in my case, as I'm used to cleaning up after myself, I used a <a href="https://github.com/JanDeDobbeleer/dotnet-core-sample/blob/master/build.cake#L40" target="_blank">custom implementation</a> in the sample project. The main reason is that there's a lot more output coming from a build than the output from MSBuild, and I want to make sure everything is nice and tidy. In case you'd opt for the built-in, the task would look something like this.

```csharp
Task("Clean")
  .Does(() =>
{
  DotNetCoreClean("./src/project");
});
```

Remember, you can do anything you want here, so maybe you're fine with this, or prefer a more custom approach, the choice is yours.

The approach to restore nuget packages and build the projects is almost identical other than having the ability to define a few settings. You can find all information on the Cake <a href="https://cakebuild.net/dsl/dotnetcore/" target="_blank">website</a>, or have a peek at <a href="https://github.com/JanDeDobbeleer/dotnet-core-sample/blob/master/build.cake#L72" target="_blank">the sample project</a> for inspiration.

## Enable static code analysis and linting

Now that we have our base setup ready, we finally get to the interesting bits. When we think about .NET and code analysis, I hope you can't help but think about Resharper. By coincidence, JetBrains provides **two CLI tools** <a href="https://www.jetbrains.com/help/resharper/ReSharper_Command_Line_Tools.html" target="_blank"></a>, inspectCode and dupFinder. The first one handles all checks included in Resharper, the second one will look for duplicate code blocks. **The cool thing is** that we can make it validate the same ruleset we enforce via Visual Studio, by saving them to your project's `DotSettings` file. You can read more about that <a href="https://www.jetbrains.com/help/resharper/Sharing_Configuration_Options.html" target="_blank">here</a>, we'll be using the 'Solution team-shared' layer in this sample.

What might also be good to know is that Resharper in Visual Studio provides support for <a href="http://editorconfig.org/" target="_blank">.editorconfig</a> files, but those can't be used in combination with the CLI version. I spent about an hour trying to get it to work to finally come to that conclusion with the help of <a href="https://twitter.com/maartenballiauw/status/988094504531095552" target="_blank">Maarten Balliauw</a>.

To use these tools in our Cake script, we need a few dependencies. First of all, and maybe that's not at all a problem in your case, we need the <a href="https://chocolatey.org/packages/visualstudio2017buildtools/15.2.26430.20170605" target="_blank">Visual Studio build tools</a> and enable DotNet Core suppport. As **a developer who only uses Visual Studio Code**, I did not have these preinstalled, causing a lot of pain and unclear errors. So, if you're like me, install these on your host or build machine if that's not already the case. Secondly we can make use of a Cake plugin called, you guessed it, <a href="https://cakebuild.net/dsl/resharper/" target="_blank">Resharper</a>. To include it, add the following line on top of your `build.cake` script. This will make the bootstrapper resolve the dependency when running Cake.

```shell
#tool "nuget:https://www.nuget.org/api/v2?package=JetBrains.ReSharper.CommandLineTools&version=2018.1.0"
```

Make sure to **lock the version number** of external dependencies to avoid unwanted side effects. Updates to these tools should always be validated beforehand.

All that's left is to create tasks to validate our code.

```csharp
Task("DupFinder")
    .Description("Find duplicates in the code")
    .Does(() =>
{
    var settings = new DupFinderSettings() {
        ShowStats = true,
        ShowText = true,
        OutputFile = $"{artifactsDir}/dupfinder.xml",
        ExcludeCodeRegionsByNameSubstring = new string [] { "DupFinder Exclusion" },
        ThrowExceptionOnFindingDuplicates = true
    };
    DupFinder("./App.sln", settings);
});

Task("InspectCode")
    .Description("Inspect the code using Resharper's rule set")
    .Does(() =>
{
    var settings = new InspectCodeSettings() {
        SolutionWideAnalysis = true,
        OutputFile = $"{artifactsDir}/inspectcode.xml",
        ThrowExceptionOnFindingViolations = true
    };
    InspectCode("./App.sln", settings);
});
```

It will use our `DotSettings` file out of the box, so no need to specify it. You can look at the <a href="https://github.com/JanDeDobbeleer/dotnet-core-sample/blob/master/App.sln.DotSettings" target="_blank">sample</a> to see the syntax, if you need to know where to find the names for these rules, have a look at the <a href="https://www.jetbrains.com/help/resharper/Reference__Code_Inspections_CSHARP.html" target="_blank">documentation</a>.

We can add another interesting tool caled DependenciesAnalyser. It will look at your nuget dependencies and see if they are outdated. It won't fail the build but it's such a good thing to include as **you might otherwise forget** about this (I know I do). When I run it at the time of writing, it provides the following ouput, telling me I can update two dependencies.

**EDIT:** It seems this makes the UNIX builds <a href="https://ci.appveyor.com/project/JanJoris/dotnet-core-sample/build/1.0.18/job/ijjicjy5joieu8jn" target="_blank">fail</a>. I created an <a href="https://github.com/joaoasrosa/dotnet-project-dependencies-analyser/issues/12" target="_blank">issue</a> on the project to remind myself to have a look. For the time being I removed the task from the sample.

```shell
========================================
Analyse-Dependencies
========================================
Executing task: Analyse-Dependencies
Resolving assembly Domain.XmlSerializers, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null
---------------------------------
Project: ./App\App.csproj
---------------------------------

---------------------------------
Project: ./Test\Test.csproj
coverlet.msbuild is on version 2.0.0. The dependency is outdated.
FluentAssertions is on version 5.3.0. The dependency is up-to-date.
Microsoft.NET.Test.Sdk is on version 15.7.2. The dependency is outdated.
xunit is on version 2.3.1. The dependency is up-to-date.
xunit.runner.visualstudio is on version 2.3.1. The dependency is up-to-date.
---------------------------------

Finished executing task: Analyse-Dependencies
```

For convenience we can group these as one Task, to facilitate running the checks separately when needed.

```csharp
Task("Validate")
    .Description("Validate code quality using Resharper CLI. tools.")
    .IsDependentOn("Analyse-Dependencies")
    .IsDependentOn("DupFinder")
    .IsDependentOn("InspectCode");
```

##  Run unit tests and upload coverage

Writing unit tests has always been a pleasure on DotNet. My base setup consists of a few winners (_opinion_, it's my blog after all) like <a href="https://xunit.github.io/" target="_blank">xUnit</a> and <a href="https://fluentassertions.com/" target="_blank">Fluent Assertions</a>. Creating a test project can be done using the `dotnet new xunit` command, and installing packages follows the `dotnet add package FluentAssertions` syntax. You can run the tests using `dotnet test`. A sample setup and explanation can be found on <a href="https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test" target="_blank">Microsoft's website</a> if you need a more in-depth introduction.

Cake provides the same ease of use compared to the other standard DotNet Core functionality, which makes our task look like this.

```csharp
Task("Test")
    .Description("Run all unit tests within the project.")
    .Does(() =>
{
    DotNetCoreTest("./Test/Test.csproj");
});
```

Now, this gives us the ability to run unit tests, but how about calculating code coverage? It turns out there's an MSBuild extension that enables just that. It's called <a href="https://github.com/tonerdo/coverlet" target="_blank">coverlet</a> and you can add it as a nuget package to your test project: `dotnet add package coverlet.msbuild`. To use its functionality, we need to add a few additional parameters to the `Test` task.

```csharp
var settings = new DotNetCoreTestSettings
     {
         ArgumentCustomization = args => args.Append("/p:CollectCoverage=true")
                                             .Append("/p:CoverletOutputFormat=opencover")
                                             .Append("/p:ThresholdType=line")
                                             .Append($"/p:Threshold={coverageThreshold}")
     };
DotNetCoreTest("./Test/Test.csproj", settings);
```

What it does is add those parameters to MSBuild, which will then use coverlet to calculate the coverage. We want to have line coverage, which we can specify using `/p:ThresholdType=line`. This will calculate the percentage depending on whether or not every relevant line is covered by a unit test. If the percentage drops below a certain threshold (defined op top of `build.cake`), it will fail the build. The output format is opencover which we need to export the result to <a href="https://coveralls.io/" target="_blank">Coveralls.io</a>, where we can keep track of our coverage cross build and cross branch. The advantage of using an external service is that you can't simply adjust the threshold to fix a build failure. It will also hold you back to merge changes to master in case of a drop in coverage (thresholds can be agile about this) when configured that way in GitHub for example.

To upload the changes to Coveralls.io we need three extra dependencies.

```csharp
#tool "nuget:https://www.nuget.org/api/v2?package=coveralls.io&version=1.4.2"
#addin "nuget:https://www.nuget.org/api/v2?package=Cake.Coveralls&version=0.8.0"
#addin "nuget:https://www.nuget.org/api/v2?package=Cake.Incubator&version=2.0.1"
```

<a href="https://cakebuild.net/api/Cake.Incubator/EnvironmentExtensions/31E6B762" target="_blank">Incubator</a> is needed to work with environment variables as **we don't want to include our Coveralls.io API token in the build script** (seriously, don't). No matter the CI tool, you can always add environment variables to use in your build logic. The proper way is to have them in the build script as encrypted variables, so that they can't be used other than during the CI phases, but you can still adjust them via source control. I'm using <a href="https://www.appveyor.com/" target="_blank">Appveyor</a> myself and it can <a href="https://ci.appveyor.com/tools/encrypt" target="_blank">encrypt variables</a> to add to your `appveyor.yml` script.

To upload the coverage statistics via Cake, we make use of the <a href="https://cakebuild.net/addins/code-coverage/#cake-coveralls" target="_blank">Coveralls</a> add-on. Combine this with incubator to retrieve the API token during build and we can upload the file generated by coverlet.

```csharp
Task("Upload-Coverage")
    .Does(() =>
{
    var isRunningOnAppveyor = EnvironmentVariable<bool>("APPVEYOR", false);
    if (!isRunningOnAppveyor)
        return;
    Information("Running on Appveyor, uploading coverage information to coveralls.io");
    CoverallsIo("./Test/coverage.xml", new CoverallsIoSettings()
    {
        RepoToken = EnvironmentVariable("coveralls_token")
    });
});
```

Now that we've got all of this available, we can define a basic CI task to execute on the build machine.

```csharp
Task("CI")
    .Description("Build the code, test and validate")
    .IsDependentOn("Build")
    .IsDependentOn("Test")
    .IsDependentOn("Validate")
    .IsDependentOn("Upload-Coverage");
```

As we're entering a world where C# has the ability to run on other machines than Windows alone, I made a Unix specific build task too.

```csharp
Task("CI-UNIX")
    .Description("Build the code, test and validate")
    .IsDependentOn("Build")
    .IsDependentOn("Test");
```

This way we have Appveyor to run the tests on Windows (including the static analysis and code coverage uploading) and Linux, and <a href="https://travis-ci.org" target="_blank">Travis.ci</a> to run the tests on OSX. As we've got a Cake build script, all we need is the two config files to tell our CI instances what to do. Beware, Appveyor can run PowerShell on Windows and Linux, so we need to check where we are before executing the same command twice.

```yaml
image:
- Visual Studio 2017
- Ubuntu
environment:
  coveralls_token:
    secure: HMJLoYbkSD1p35JnHiBjv02frHKMvasoD9J6wLnzjSUsdPwFwiHU8t0SwcvyAYi1
build_script:
  - pwsh: |
      if ($isWindows) {
        .\build.ps1 -Target CI
      }
  - sh: ./build.sh --target=CI-UNIX

```

```yaml
language: csharp
mono: latest
dotnet: 2.1.200
os: osx
script:
  - ./build.sh --target=CI-UNIX

```

If you're curious about the output or build time, you can have a look at the project on <a href="https://ci.appveyor.com/project/JanJoris/dotnet-core-sample" target="_blank">Appveyor's</a> or <a href="https://travis-ci.org/JanDeDobbeleer/dotnet-core-sample" target="_blank">Travis'</a> website.

This is as far as I wanted to go with this. I'll try to keep the project up-to-date with interesting add-ons, or maybe you know of some improvement and would like to propose a PR? Do not hesitate to get in touch!

<a class="github_link" href="https://github.com/JanDeDobbeleer/dotnet-core-sample" target="_blank" >Source code</a>
