---
categories:
- dev
date: 2017-03-01T00:00:00Z
description: How can we get notifications about chocolatey or PSGallery packages which
  can be upgraded from within PowerShell? Read on!
tags:
- automation
- cli
- tool
- tooling
- github
- open source
- powershell
- chocolatey
- PSGallery
title: Got a package?
url: /got-a-package
---

We all know Linux has a lot more focus on CLI tooling compared to Windows. One of the things I like when working on Ubuntu, is that it notifies me of available updates every time I open the terminal. Which is why, when I read this <a href="http://jdhitsolutions.com/blog/powershell/5441/check-for-module-updates/" target="_blank">post</a> by <a href="https://twitter.com/jeffhicks" target="_blank">Jeff Hicks</a>, it made me think of extending his script to achieve just that. As **I use both chocolatey and the PowerShell Gallery** to manage my tooling on Windows, it made sense to include both and output available updates whenever I start a new PowerShell session.

Getting the chocolatey information turned out to be a bit tricky, as **it doesn't really provide an output you can work with**. Instead, I had to capture the necessary information via regex. This works, but can also break without prior notice. When it comes to retrieving the PSGallery information, we get proper PSObjects which provides a much more reliable solution. I started out by using Jeff's script, but ended up tweaking it so that it respects the highest installed version for a module to decide whether we have an update available.

There's just one little problem. Retrieving the information takes a while. **As nobody feels like waiting every time they start a PowerShell session**, we need a different way to fetch and display the information. The solution is to make sure the module gets and saves this information on startup so we can use that to print it when starting a session. I tried using the `Register-ScheduledJob` cmdlet, but I never got that to work. Thankfully, we can still use some old tricks to run scripts at logon. All you need to do, is create a shortcut under `shell:startup` with the following content:

    C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -WindowStyle Hidden -Command "Save-PackageUpdates"

Once that's created, make sure to install the module using `Install-Module get-packageupdates -Scope CurrentUser`. Then, alter your `$PROFILE` to include the logic:

    Import-Module get-packageupdates
    Write-PackageUpdates


After you log in, `Save-PackageUpdates` will fetch the update information and save it to a file called `~\.updateInfo`. Once you start a new PowerShell session, the file contents will be read and printed if they are available. It takes about a minute to get the information, so take that into account. I start a lot of sessions throughout the day, so I'm sure to see the information at least a few times and not forget to update my packages.

If you're like me and always forget to check for updates, **make sure to give this a go**. And if you'd like to extend it's functionality, you can find the source code on the usual spot ;-)

<a class="github_link" href="https://github.com/JanDeDobbeleer/Get-PackageUpdates" target="_blank" >Source code</a>
