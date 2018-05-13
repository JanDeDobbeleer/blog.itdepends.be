---
categories:
- dev
date: 2016-09-01T00:00:00Z
description: Getting tired of typing the same command over and over? Check out this
  PowerShell port of the Bash tool called with and use your CLI like a pro!
tags:
- bash
- cli
- command
- git
- oh-my-posh
- posh-with
- powershell
- repeater
- with
title: Get down with it
url: /get-down-with-it
---

I'm a **sucker for cool CLI tools**, I admit it. And people know this. Ever since I ditched GUI tools for the more powerful console, I'm looking for things that make my life even more awesome. When Kristof Claes brought <a href="https://twitter.com/kristofclaes/status/766170743310807040" target="_blank">with</a> to my attention, I've been working on a PowerShell port which is ready for the public!

But what is `with`? According to the description on <a href="https://github.com/mchav/with" target="_blank">GitHub</a> it's "**Command prefixing for continuous workflow using a single tool**". Sounds cool, doesn't it? What it does is allow you to prefix a command to your command line so you don't have to type this going forward. I always split my console into tabs with different shells (Bash and PowerShell) which are also split into other shells each containing 1 specific task (build, git, productivity and whatever). Using `with` I can repeat one statement until infinity by using enter or type git commands without typing git. It **makes me faster** and fits perfect in the way I use the command line.

In fact, I enjoyed using this so much I decided to integrate it into <a href="https://www.herebedragons.io/oh-my-posh/" target="_blank">oh-my-posh</a>. Not only does it work fine, **it looks great too** :-). There are a few more things on the road map such as settings to allow overriding the `:q` command to exit `with`. I tried to keep everything as close to the original as possible, but you might not necessarily like it that way.

Happy CLI-ing!

<a class="github_link" href="https://github.com/JanJoris/posh-with" target="_blank" >Source code</a>