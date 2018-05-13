---
categories:
- automation
date: 2016-05-24T00:00:00Z
description: Ever wondered if you could resolve GitHub pull requests from your PowerShell
  console? I know I did, so I created a tool to assist me.
tags:
- api
- branch
- commit
- fast forward
- git
- github
- log
- master
- powershell
- pull request
title: Power pulling
url: /power_pulling
---

A while ago I <a href="https://www.herebedragons.io/cross-platform-code-reviews/" target="_blank">wrote</a> about how we do cross platform code reviews in our team to boost productivity and share knowledge. To do this we rely on Github and their pull request feature as there is no such thing in Git itself. Up until last week, we used merge commits to resolve pull requests as no other option was available and honestly, we didn’t know any better. The result is that our entire master branch is without meaning. There is no real log apart from features being merged into it. Which can be fine for you, but I don’t like it. I like my master branch to be a single beautiful line with meaningful commits (yes, **I'm a purist**).

To achieve this, we moved to merging using the `--ff-only` flag. By doing so Git will only allow the merge when a fast forward is possible. Of course, this doesn't always come without side effects. Before we can fast forward, we have to rebase our feature branches if master diverted once they were branched off. It also showed us that having **2 long lived branches** (master and develop) **is beyond annoying**. I had a really good discussion about this with <a href="https://twitter.com/YvesHanoulle" target="_blank">Yves Hanoulle</a>, who was patient enough to keep trying to convince me to only use one long lived branch. It turns out, he was right.

The problem is, GitHub does not support the `--ff-only` flag for resolving pull requests. So, if we want to do this in an efficient and non-time-consuming matter, **we have to automate it somehow**. Now, I could have created an alias that merges two branches the way I want it, but my goal was to not be forced to leave the console when it comes to handling pull requests. Luckily, GitHub has an API that allows you to work with pull request for any given repository. For my specific use-case, I was looking for a tool that, from the console, could:

*   List the pull requests while in a repository
*   Create a new pull request from the branch I’m currently working on
*   Resolve a pull request using my own logic

In this situation, there are two thing you can do. Find a tool that works, or build your own. I found a few tools that have the ability to talk to the GitHub API, like gitsome or posh-github, but neither of them really did what I was looking for. **So I built my own**. Straight from the PowerShell console, this tool allows me to review a pull request using the defined difftool, resolve pull a request once I deem it worthy and create a new pull request from the branch I’m currently working on. Meet PS-GitHubPullRequest (I might have to work on that name).

<a class="github_link" href="https://github.com/JanJoris/PS-GitHubPullRequest" target="_blank" >Source code</a>