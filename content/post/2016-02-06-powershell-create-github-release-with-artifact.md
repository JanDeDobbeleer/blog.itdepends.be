---
categories:
- automation
date: 2016-02-06T00:00:00Z
description: Automate tagging and artifact uploading to GitHub using PowerShell.
tags:
- api
- cd
- ci
- continuous deployment
- continuous integration
- delivery
- deployment
- github
- integration
- powershell
- script
- version
title: Powershell - Create a Github release with artifact and changelog
url: /powershell-create-github-release-with-artifact
---

If you happen to be a Windows app developer like me, you know that it is currently impossible to upload releases to the Store through command line. Not only is this rather annoying, it also breaks any Continuous Deployment flow you would like to implement. To sort of remedy this I decided to upload the artifacts created by our build server to Github, which also has the added benefit to tag your releases and add a change log.

Before you can get started, we need to retrieve an **API key** from an account that has access to the repository. Go to your Github account settings, select Personal access tokens and press the "Generate new token" button.

<img src="http://www.herebedragons.io/images/pat.png" width="625" class="alignnone size-medium wp-image-1132" />

Once you have your API key, you can start filling out the required fields:

*   $versionNumber -> do I need to explain this one?
*   $commitId -> can be either a branch name or a commit hash
*   $preRelease -> boolean to indicate whether this is a pre release version (alpha, RC, whatever)
*   $releaseNotes -> a nice little text containing all the fixes and features
*   $artifactOutputDirectory -> where can we find the artfact?
*   $artifact -> what's the artifact? The script likes zip files, adjust it towards your needs
*   $gitHubUsername -> the username of the owner of the repo
*   $gitHubRepository -> the name of the repo
*   $gitHubApiKey -> the key you just made

The script contains a variable called **$draft**, I set it by default to true here as I assume you'd like to test this before going full monty. This way tags are not yet set so you can easily delete the release without trouble. *Don't forget to set it to false once you decide to go live.*

{% gist ee4c7f9b4289016b2216 %}
