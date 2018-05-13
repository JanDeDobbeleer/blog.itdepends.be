---
categories:
- process
date: 2016-11-24T00:00:00Z
description: What did I learn through adopting a devops mindset within myself and
  the team. Part I tackles continuous integration.
tags:
- software engineering
- IT OPS
- automation
- cli
- command line
- shell
- GUI
- devops
- cool
- tool
- tooling
- continuous integration
- integration
- continuous
- unit test
- testing
- QA
- github
- bitbucket
- vsts
- visual studio
- team services
- vso
- gitlab
- git
- vcs
- make
- makefile
- build
title: Devops workflow Part I - Continuous Integration
url: /devops-part1
---

Talking about adopting a devops or agile mindset is all fun and games and probably done with best intentions, but how do you go about this? What do we need to make this the success story everyone, including me, talks about? I spent a lot of time preparing my talk about this at the UCLL last month because in fact, I had an idea about what made this happen and I wanted to get the bigger picture. The following post and the one after this will illustrate my findings and serve as a **guide into getting a devops flow up and running**.

But first, let's make one thing clear. If you are a student reading this, pay attention. The past year I've come across a lot of people using Dropbox or Google Drive to work on code. Or, people who have no idea how to start writing unit tests, let alone see a reason to write them. I have no idea if this is due to a failing educational system, lack of time, or other undefined reasons but somewhere we seem to think we can teach people how to write code and not start out with everything that surrounds it. But you can't. If we want to get people ready to start working and provide added value to the current engineering landscape, they must be ready to tackle the world out there. There are so many challenges and without the proper background, they will spend the next few years getting up to speed with all of that. Devops can't be escaped anymore, it's not a silver bullet but it solves a lot of problems we face today and we need everyone to be as versatile as they can to succeed. **You can't just focus on writing code alone**, there's a lot more to an engineer’s life than that.

Alright, let's start by looking at what continuous integration (CI) is. When we try to find a description of CI, we can narrow it down to this definition:

> Continuous Integration (CI) is a development practice that requires developers to integrate code into a shared repository several times a day. Each check-in is then verified by an automated build, allowing teams to detect problems early.

There are three important items here we must work with. **Shared repository, automated build and tested**. I'll try to explain everything so that you don't need a lot of experience to understand what I'm talking about. Let's break it down one by one.

### Shared repository

For those of us who have no idea what this means, it can be explained rather simple. When we change code by adding functionality or fixing things, we need a way to track how the code evolved over time. For example, we want to look at what the changes were or easily revert to a previous state of our codebase. To do so we make use of a version control system (VCS). As with everything, a lot of tools have come and gone and in my experience, **only git remained**. I've covered git in previous [posts](https://www.herebedragons.io/git-inside-outside-visual-studio) so if you're not familiar with it, take a look.

Looking at it from a developer perspective, git allows you to decide which changes belong together and bundle them (commit) so we can add those changes to our history. Not only is this useful, it also encourages you to think about what you are doing, given you respect a few basic rules. And they are very straightforward too. Every commit (bundled changes by you) should be atomic, which means it should contain the work of a specific task, small enough so you can understand what was being done by both the message and the changes it contains. This implies you must be able to take the changes up to that point and have something that works. There should never be commits in your long-lived history that rely on others to be functional. Don't mistake this for bugs, that's not the same thing. Your code can be fully functional at one time and still contain bugs. In fact, you can just trust me when I say **there will always be bugs in your code** going forward. Either conscious (we can't fix them) or unconscious (we haven't found them yet). Realizing this we need to make sure we have something in place that allows us to move reliably and fast, from writing code to putting it in production.

So how do we go from version control to a shared repository? Git allows us to work both locally and remote, so we can select from a few platforms to host our code and enable a distributed workflow. Most of the time we are not working on code alone, but even in that case I still advice to setup a remote repository. For my personal projects for example I've setup repositories on [GitHub](https://github.com/) that all use a devops workflow. It enables 2 things. Number 1, I can get push code off my machine, to the cloud and have a backup. Secondly, I have the power to enable an entire workflow just because I'm using git and have a ton of tools at my disposal who each integrate with GitHub.

But the fun doesn't stop at GitHub. There are a bunch of platform out there allowing us to host our code using git that each provide integrations with a lot of useful services. While most of them allow us to host our code publicly for free, [BitBucket](https://bitbucket.org/) or [VSTS](https://www.visualstudio.com/team-services/) also allow free private repositories. This can be extremely useful for students working on an assignment or companies trying to get things going for the first time. I've had a good experience putting my code "out there" as it forces me to work properly. Nothing says commitment like when the whole world is watching what you do. And yes, it should not make a difference, especially in a work environment, but really, you are putting too much fate in humanity. If you're a developer right now working on code that's behind closed doors, ask yourself whether you'd put it out there as is. Probably not. So, do it, and fix whatever makes you feel ashamed. You'll only **create a better product** and get more productive doing so.

So, why git? Why not SVN, TFS, Bazaar, Perforce, etc.? There's a reason git has gotten such a grand following. Where before, creating branches on traditional VCS's was a hassle, git basically makes that so easy it can be used as part of your workflow. It has insane logic under the hood that can help you merge code automatically to reduce some of the pain that comes with working on code in a team and makes it so easy to fail and ruin stuff by enabling undo functionality on insane levels. But yes, the learning curve is steep. Very steep. But once you've overcome that and became the branching, merging and even rebasing master, there's almost no limit to what it can do. Branching becomes a part of your daily workflow. You'll create and dispose of branches daily to be able to structure your work and get feedback from your CI setup. **Everything is based on allowing you to fail safely**, by putting steps into place that will alert you when you do. Not when your code is in production but while you are adjusting it. In that sense, adopting CI is about commit often and push often too. When I start to work on something, I create a new branch based on master, push that one to my remote repository on GitHub and start working. When I've got one piece of the puzzle bundled, I'll push that to GitHub right away and the connected parts get to work and let me know if I did a good job or not. Not after one hour or half a day, no, within minutes. That way I'm still in the proper context and can adjust immediately instead of having to figure out what I was doing. Which seamlessly brings us to the next item.

### Tested

Our goal is to provide feedback about what we wrote and how it behaves within the already existing code. The most basic information is "does it compile?", but there's a lot more we can cover before and after that. For example, our IDE's can provide information about the quality of our code while we write it. Well, we can add that logic to our CI and check that before doing anything else. There are a lot of powerful CLI linting tools that can help us achieve this and we can use that information to either proceed to the next step or fail the build. And let's be clear, **it's not meant as an annoyer but rather a safety net** for mistakes you might not have noticed. We want to get feedback the fastest way possible, and when the quality of the code is not sufficient, there's no need to do anything else but inform us.

Validation is not only something that is done on code itself, when building Windows 10 apps for example, I always run the [WACK](https://developer.microsoft.com/en-us/windows/develop/app-certification-kit) on the created app package to make sure it complies with the Windows Store rules. You do not want to find out something like this is wrong during a deploy, so catching these errors early on adds to the safety. The aim of validated and tested code is to **make deploys to production a no-brainer**. There shouldn't be any level of fear attached to it, in fact the more we can allow this to flow naturally and rely on our tooling to provide information about what we do, the faster and more reliably we can get code to our users.

So please, write unit tests. I’m a sucker for [TDD](https://en.wikipedia.org/wiki/Test-driven_development), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and the [tooling](http://www.fluentassertions.com/) you can find in virtually every language to enable this. There's so much to be learned from writing tests before writing code and I can only advice it. You have no idea what this means unless you've done it. My code has always improved a lot by doing this. **It has a positive impact on quality, code architecture and thus flexibility**. If everything you write must be testable, you need to take that into account before you start writing that code. Being a QA guy in the past and writing apps for myself has taught me this the hard way. And yes, it requires a specific mindset too. A lot of developers only test the happy paths, but the QA guys never start out by verifying those. No, they want to break whatever you deliver. For them it's frustrating and rewarding at the same time. They hate returning stuff that doesn't work, but they sure love to prove how much you suck. Adopt that mindset. **Break your own stuff**. Battle your brain. Coding becomes so much more fun when you broke stuff a few times and applied a better and more flexible outcome doing so.

Maybe a little warning to end this item? Be very careful with functional UI tests. I like them but they can be expensive. Parallelizing them is an option, so take that into account. In my experience, testing all the different paths through unit tests and add one or two functional tests to see if everything connects properly is enough for most use-cases. Also, code coverage can be a good measure for quantity, but never make any assumptions on the quality of your code. Food for thought.

### Automated build

Building the codebase does not necessarily mean this is a step for code that requires compilation only. To move code to production we will need to package it to facilitate that process. Doing so, and the steps needed to achieve this is the what this is about.

We split our build logic into steps so we can easily run the validation and tests, compile the code, bundle build artifacts, tag a version if needed and make sure we can access all that information. So how do we do this? When I started out, I used to configure a lot of these steps in the CI tool of choice. It seemed like the most straightforward approach but **quickly backfired because of a few reasons**. A, you have no way to run the build locally the exact same way the CI will do it and B, you can't easily switch to another CI tool other than going down the copy-paste route. Annoying.

The solution is to make use of a make file. Make has been around since the beginning of time and there's a make variant for every language you can think of. This means you need to know what your code needs to be verified, build and tested. When I [rant](https://www.herebedragons.io/dont-hate) about the need to know how to handle the CLI, this is one of the most important reasons to do so. It will enable you to define each step as a separate task and allow you to execute those locally when needed. **Setting up a CI becomes as easy as adding one-liners** to steps or creating 1 task in a make file that bundles other tasks. Done. Relying on your IDE for these tasks can end up in a different behavior, I know this by experience. Also, you will learn a lot by gaining knowledge on how your code is handled, something that can easily be obfuscated by always using your IDE for everything.

A lot of CI tools have support for YAML configuration files. And I recommend using those to setup your build and environment. I want developers to stay as much in their comfort zone as possible. This implies that any potential changes to build logic or CI setup must be handled within that zone. By using both make and YAML config files, **there's no need to leave your IDE** of choice to apply and test changes. Depending on how far you want to go, you can either bundle build dependencies within your code base or use provided support in your CI tool, the choice is yours. It all depends on the project and your preferences really. Just make sure to not select a CI where this can't be done (Jenkins 2 uses Groovy files, also neat), don't configure logic through the CI GUI and you'll be fine.

When everything is set up the way you want, this will enable a feedback loop that allows you to get information about your work as you proceed. Depending on the codebase you'll have to look at different CI tools to find the one that suits your needs the most. I build my .NET code on [AppVeyor](https://ci.appveyor.com/), but I've also used [Jenkins](https://jenkins.io/index.html), Bamboo (don't use it), [Circle CI](https://circleci.com/) and others in the past. There are neat tools out there like [Catlight](https://catlight.io/) that send push notifications containing build information to your desktop, which is useful when you start out. I advise to **create a build dashboard**, using Dashing for example, so that you can keep a close eye on the status of your builds. I've met teams who keep track of their build statuses for a longer period to learn from it as they can contain information you wouldn't see otherwise. Builds can fail for a wide variety of reasons, and it's not a bad thing. Nobody should be shot for breaking the build, I expect them to fail. Non-failing builds usually indicate you've either not tested the code properly, or you are superman/woman who doesn't need a safety net in the first place. I'll let your users be the judge of that. **The only thing that matters is how fast you can get back up**.

Next time we'll talk about how to use this setup to create an even crazier way of working and give everyone in your team the proper motivation to deliver value to either the team or end-users. In the meantime, have fun setting up or tweaking your CI!