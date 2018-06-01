---
categories:
- dev
date: 2017-03-16T00:00:00Z
description: PowerShell is a great scripting language with an awesome testing utility
  called Pester. So how can we show the world exactly how cool we are? By adding code
  coverage badges to our repos of course!
tags:
- git
- cli
- tool
- tooling
- open source
- version control
- powershell
- codecoverage
- coverage
- coveralls
- github
- badge
- shieldsio
- shield
- percentage
- pester
- unittests
- testing
- tdd
- appveyor
- ci
- buildscript
- yml
- appveyor.yml
title: Cover all the things
url: /cover-all-the-things
---

This is one which has been on my list for a while. Coming from writing C# and being used to existing tooling and integrations with popular platforms to display information about your code, I kind of miss that when writing PowerShell. One of those is code coverage uploading and displaying on <a href="https://coveralls.io" target="_blank">Coveralls.io</a>. Not just because it's cool, but it allows you to add that information to your repository and **enforces you to either keep the current number or improve it**. But, as it seems I once said something about not bitching and getting shit done, let's fix that, shall we?

<blockquote><p>&quot;You should get your work done instead of bitching about it&quot; - another great quote from <a href="https://twitter.com/Jan_Joris">@Jan_Joris</a> <br>I can only subscribe and say amem</p>&mdash; Jønatas C D (@JonatasCD) <a href="https://twitter.com/JonatasCD/status/839447648901955584">March 8, 2017</a></blockquote>

PowerShell has an awesome testing tool called <a href="https://github.com/pester/Pester" target="_blank">Pester</a>, if you've never used it, make sure to check it out. Pester had the ability to check for code coverage out of the box. It will list all lines within the specified files which have been hit, how many times they've been hit and what never got hit. Using this information, we can format that to send it to Coveralls for displaying. As **I know everyone loves a bit of simplicity**, I created a <a href="https://www.powershellgallery.com/packages/coveralls" target="_blank">module</a> called Coveralls that allows you to take advantage of this logic and use it wherever you'd like. In my case, I added it to the testing logic for modules on <a href="https://www.appveyor.com/" target="_blank">AppVeyor</a>, so that the coverage is updated every time the code is tested on master. To do this you need to add a few lines to your `appveyor.yml` file.

First off, we need a key to push the results to Coveralls. Make sure to create a <a href="https://ci.appveyor.com/tools/encrypt" target="_blank">secure variable</a> using the Coveralls API token for your repository.

```yaml
environment:
    CA_KEY:
      secure: yyBVxcqc8JCSyOJf5I8ufwmwjkgMxouJ1ZyuCkAXdffDDU2VfZCZHK9lkHeph3SM
```

Secondly, we need to resolve a few dependencies.

```yaml
before_test:
  - ps: Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
  - ps: Install-Module Coveralls -MinimumVersion 1.0.5 -Scope CurrentUser
  - ps: Import-Module Coveralls
```

It could be you'll also need the nuget provider, if you'd see an error indicating this, just prepend `- ps: Get-PackageProvider -Name Nuget -Force` to the `before_test` section.

Lastly, we need to format and publish the results.

```yaml
test_script:
  - ps: $coverageResult = Format-Coverage -Include @('Helpers\PoshGit.ps1','Helpers\Prompt.ps1','install.ps1') -CoverallsApiToken $ENV:CA_KEY -BranchName $ENV:APPVEYOR_REPO_BRANCH
  - ps: Publish-Coverage -Coverage $coverageResult
```

> There's just one caveat here. As Keith Dahlby found out when we added this to <a href="https://github.com/dahlbyk/posh-git/pull/461#issuecomment-286946980" target="_blank">posh-git</a>, **secure variables do not work on pull requests**. This is done to avoid anyone decrypting and displaying that value and run away with your online identity, maybe ending up dating your wife and feeding your kids (the bastards!). As we don't want that, make sure you either check you have a value in `$ENV:CA_KEY` and replace it with dummy info if not or don't build on PR's.

This example is coming from my <a href="https://github.com/JanDeDobbeleer/oh-my-posh" target="_blank">oh-my-posh</a> repository, where you can already see a neat Coveralls badge displaying the, somewhat disappointing, code coverage percentage. You can find more info about the module when you visit the project on GitHub. And yes, I do see the irony in having a module about code coverage with 0 tests and no lovely badge. It's on my list, ok? Don’t be a dick about it.

<a class="github_link" href="https://github.com/JanDeDobbeleer/coveralls" target="_blank" >Source code</a>
