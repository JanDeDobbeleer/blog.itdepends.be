---
date: 2017-05-16T00:00:00Z
description: Can we create an isolated developer and build environment for Java? I
  put it to the test.
tags:
- git
- cli
- tool
- tooling
- open source
- version control
- java
- github
- travis
- circleci
- circle
- alpine
- gradle
- make
- jacoco
- docker
- coala
- testing
- ci
- continuous integration
- build
title: Java two dot oh
url: /java-two-dot-oh
---

I have to admit it, **I'm not the biggest fan of Java**. But, when they asked me to prepare a talk for 1st grade students who are currently learning to code using Java, I decided it was time to challenge some of my prejudices. As I selected continuous integration as the topic of choice, I started out by looking at all available tools to quickly setup a reliable Java project. Having played with dotnet core the past months, I was looking for a tool that could do a bit of the same. A straightforward CLI interface that can create a project out of the box to mess around with. <a href="https://maven.apache.org/" target="_blank">Maven</a> provided to be of little help, but <a href="https://gradle.org/" target="_blank">gradle</a> turned out to be exactly what I was looking for. Great, I gained some faith.

It's only while creating my slides and looking for tooling that can be used specifically for Java, that I had an epiphany. What if it is possible to create an entire developer environment using docker? So no need for local dependencies like linting tools or gradle. **No need to mess with an IDE** to get everything set up. And, no more **"it works on my machine"**. The power and advantages of a CI tool, straight onto your own computer.

A quick search on Google points us to gradle's own Alpine linux <a href="https://hub.docker.com/_/gradle/" target="_blank">container</a>. It comes with JDK8 out of the box, exactly what we're looking for. You can create a new Java application with a single command:

    docker run -v=$(pwd):/app --workdir=/app gradle:alpine gradle init --type java-application

This starts a container, creates a volume linked to your current working directory and initializes a brand new Java application using `gradle init --type java-application`. As I don't feel like typing those commands all the time, I created a makefile to help me build and debug the app. Yes, **you can debug the app while it's running in the container**. Java supports remote debugging out of the box. Any modern IDE that supports Java, has support for remote debugging. Simply run the `make debug` command and attach to the remote debugging session on port `1044`.

    ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

    build:
        docker run --rm -v=${ROOT_DIR}:/app --workdir=/app gradle:alpine gradle clean build

    debug: build
        docker run --rm -v=${ROOT_DIR}:/app -p 1044:1044 --workdir=/app gradle:alpine java -classpath /app/build/classes/main -verbose -agentlib:jdwp=transport=dt_socket,server=y, suspend=y,address=1044 App

Now that we have a codebase that uses the same tools to build, run and debug, we need to bring our coding standard to a higher level. First off we need a linting tool. Traditionally, people look at <a href="http://checkstyle.sourceforge.net/" target="_blank">checkstyle</a> when it comes to Java. And while that could be fine for you, I found that tool rather annoying to set up. **XML is not something I like to mess with** other than to create UI, so seeing this verbose config set me back. There simply wasn't time to look at that. Even with the 2 different style guides, it would still require a bit of tweaking to get everything right and make the build pass.

As it turns out, there are other tools out there which feel a bit more **21st century**. One of those is <a href="https://coala.io/" target="_blank">coala</a>. Now, coala can be used as a linting tool on a multitude of languages, not just Java, so definetly take a look at it, even if you're not into Java yourself. It's a Python based tool which has <a href="http://coala.io/#!/languages" target="_blank">a lot</a> of neat little **bears** who can do things. The config is a breeze as it's a yaml file, and they provide a container so you can run the checks in an isolated environment. All in all, exactly what we're looking for.

Let's extend our `makefile` to run coala:

    docker run --rm -v=${ROOT_DIR}:/app --workdir=/app coala/base coala --ci -V

I made sure to enable verbose logging, simply to be able to illustrate the tool to students. Feel free to disable that. You can easily control what coala needs to verify by creating a `.coafile` in the root of the repository. One of the major advantages to use coala over anything else, is that it can do both simple linting checks as well as full on static code analysis.

Let's have a look at the settings I used to illustrate its power.

    [Default]
    files = src/**/*.java
    language = java

    [SPACES]
    bears = SpaceConsistencyBear
    use_spaces = True

    [TODOS]
    bears = KeywordBear

    [PMD]
    bears = JavaPMDBear
    check_optimizations = true
    check_naming = false

You can start out by defining a default. In my case, I'm telling coala to look for `.java` files which are written using Java. There are three bears being used. `SpaceConsistencyBear`, who will check for spaces and not tabs. `KeywordBear`, who dislikes `//TODO` comments in code, and `JavaPMDBear`, who invokes PMD to do some static code analysis. In the example, I had to set `check_naming = false` otherwise I would have lost a lot of time fixing those error (mostly due to my proper lack of Java knowledge).

Now, whenever I want to validate my code and enforce certain rules for me and my team, I can use coala to achieve this. Simply run `make validate` and it will start the container and invoke coala. At this point, we can setup the CI logic in our `makefile` by simply combining the two commands.

    ci: validate build

The command `make ci` will invoke coala and if all goes well, use gradle to build and test the file. As a cherry on top, **I also included test coverage**. Using Jacoco, you can easily setup rules to fail the build when the coverage goes below a certain threshold. The tool is integrated directly into gradle and provides everything you need out of the box, simply add the following lines to your `build.gradle` file. This way, the build will fail if the coverage drops below 50%.

    apply plugin: 'jacoco'

    jacocoTestReport {
        reports {
            xml.enabled true
            html.enabled true
        }
    }

    jacocoTestCoverageVerification {
        violationRules {
            rule {
                limit {
                    minimum = 0.5
                }
            }
        }
    }

    check.dependsOn jacocoTestCoverageVerifica

Make sure to edit the `build` step in the `makefile` to also include Jacoco.

    build:
        docker run --rm -v=${ROOT_DIR}:/app --workdir=/app gradle:alpine gradle clean build jacocoTestReport

The only thing we still need to do is select a CI service of choice. I made sure to add examples for both <a href="https://circleci.com/" target="_blank">circleci</a> and <a href="https://travis-ci.org/" target="_blank">travis</a>, each of which only require docker and an override to use our makefile instead of auto-detecting gradle and running that. The way we set up this project allows us to easily switch CI when we need to, which is not all that strange given the lifecycle of a software project. The tools we choose when we start out, might be selected to fit the needs at the time of creation, but nothing assures us that will stay true forever. **Designing for change is not something we need to do in code alone**, it has a direct impact on everything, so expect things to change and your assumptions to be challenged.

Have a look at the source code for all the info and the build files for the two services. Enjoy!

<a class="github_link" href="https://github.com/JanJoris/java-docker-setup" target="_blank" >Source code</a>