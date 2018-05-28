---
categories:
- automation
date: 2016-04-04T00:00:00Z
description: What are the tools at our disposal we can use to easily build apps outside
  of Microsoft's tooling?
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
title: Building Windows Store apps automatically - Part I - Introduction
url: /building-windows-store-apps-automatically-part-i-introduction
---

When it comes to automating your Windows Store app builds, little resources are found when you need a setup outside of Microsoft's comfortable environment. Let's say your team uses Jenkins or Bamboo as a CI tool and you want to join in to build and test your app there too but you are faced with a few obstacles. How do we tackle store association? What about versioning? Can we run our unit tests from command line? Although none of these are hard to overcome, it does require searching through **unknown depths of MSDN documentation**. The good news is, I did that for you. So, without further ado, here's a series of blogposts on how to setup automated builds with the proper tools. I will split this in 3 parts:

*   Part I: Introduction
*   <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-ii-building" target="_blank">Part II</a>: Building
*   <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-iii-continuous-integration" target="_blank">Part III</a>: Continuous Integration
*   <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-iv-continuous-delivery" target="_blank">Part IV</a>: Continuous Delivery

The source code of this series can be found on Github.

<a class="github_link" href="https://github.com/JanDeDobbeleer/psake-example" target="_blank" >Source code</a>

## Introduction

Having a wider background than just .NET, I was used to seeing makefiles to assist in building source code. A makefile is basically a series of predefined tasks. For example, such a task can be build, test or version the code. At first I was looking into MSBuild on how to make this happen but that did not seem like a straightforward, easily maintainable option. I don't feel like messing with a .csproj file as it requires unloading a project and it's not a spot where a lot of developers spend a lot of time in. It's a good thing searching the internet for days can really pay off, as I found <a href="https://github.com/psake/psake" target="_blank">psake</a> on Github that provided me with makefile capabilities in Powershell. **I'm calling this a winner**.

To start with psake, download the source code from Github and place the `psake.ps1`, `psake.psm1`, `psake.psd1` and `psake-config.ps1` in a folder called `Build` next to your solution. I choose to add them to my source code as there is no nice way to add those dependencies on the fly. This way everyone has access to the same build logic and there is no **"but it works on my machine..."**. Now that everything is in place, we can start creating our build file. The approach I have is that I create 2 files, one that holds the logic and a second one that holds all the different build flavors. As psake can handle nested builds, this is no problem at all. The template below can be used for your app.

{% gist f0aeb8e0b30e554d51e1334fce9109a2 %}

The template consists of several parts. First off you have `Properties` where you add variables which can be accessed by all of your tasks. Think of paths, build configurations, etc. We will talk more about that in <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-ii-building" target="_blank">Part II</a>. The `VerifyBuildProperties`, `VerifyTestProperties` and `VerifyVersionProperties` tasks are used to validate the `Properties` before starting another task if needed. Psake is made so that whenever a task fails, the build will fail. Pretty useful when you need to find out what went wrong. You can find the output in the logs of your CI tool, or prompt when you build manually in your console using psake.

The other task are rather self explanatory, we have the usual suspects:

*   Build: build the app
*   Clean: clean the solution
*   Version: up the version umber by any logic you desire
*   RestorePackages: do a Nuget package restore
*   Test: run unit tests
*   Validate: run the WACK

You can specify a default task to execute when you invoke psake without specifying a task. In my case I defined that to be Build. You can see that Build depends on `VerifyBuildProperties`, `Clean` and `RestorePackages`. This means those will get executed sequentially *before* psake starts the Build task. You can add as many tasks to precede another one using `-Depends`, I believe it is good practice to have 1 default task with task dependencies that acts as the main build task and make sure the other tasks can be executed separately.

Now, **one of the cool parts** I mentioned earlier is that psake allows you to have nested statements. Say you have an app that actually has 2 Store apps linked to it, the regular production version and a beta version to limit distribution to select users. Building the app would be the same for both, but the Store association is different. Or maybe you have some compiler flags that allow for more features within the app. To do this we can create a `flavors.ps1` file to hold all the app's flavors. There we can call our `psakefile.ps1` file to do the actual building and versioning by using different `Properties` values per flavor.

{% gist 1d0ccba14d229eccab3670e2f8e10ed5 %}

You notice that I once again define a default task, this time it builds the production app. If you want to build this, we can do so by typing

    .\psake.ps1 .\flavors.ps1


to build the default task or

    .\psake.ps1 .\flavors.ps1 Beta


to build the Beta app.

With all this set up we are now ready to create the actual implementations of the tasks in our `psakefile.ps1` file. Join me in <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-ii-building" target="_blank">Part II</a> to find out how to tackle this.
