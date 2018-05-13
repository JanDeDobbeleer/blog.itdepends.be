---
categories:
- dev
date: 2017-01-05T00:00:00Z
description: Symbolic links are used all over the place on Linux, but not so much
  in the Windows world. In fact, I had no idea they existed!
tags:
- windows
- symbolic link
- linux
- hard link
- soft link
- mklink
- cmd
- powershell
title: Sorry princess, my link is symbolic
url: /symbolic-link
---

While going though tutorials about tooling on Linux, I often encountered the use of symbolic links. If you have no idea what these are about, it’s **like a shortcut** towards a file or folder while the OS makes it appear to programs as if it exists on that location. It will simply redirect to the correct location. I never really felt the need to use anything like this on Windows, until yesterday. I'm known to experiment with my devices, and thus **I end up destroying a lot** of setups and configuration.

Recently I ruined my entire Windows install as I went and implemented everything <a href="https://hackernoon.com/the-2017-pentester-guide-to-windows-10-privacy-security-cf734c510b8d#.g6jjt4wgk" target="_blank">this</a> post advised. No problem, I've got everything neatly in the cloud, so **wiping and starting over is not really an issue**. I never lose anything (*almost*). I've played a bit with [Boxstarter](http://boxstarter.org/) to automate the setup, however, I wasn't happy with the copy-pasting when it comes to config files. I keep those on Onedrive and until yesterday I used `Copy-Item` to get those from one location to the other. As I own 2 laptops, keeping those in sync is quite the *PITA*.

Symbolic links to the rescue. I never expected to find this to work on Windows, but boy, was I wrong. It's been around ever since **the dreaded Windows Vista**. In the dark ages before PowerShell, you could rely on CMD to help you out. The `mklink` command provides the options needed to create both `soft` and `hard` links, both for folders and files. Soft links are like a shortcut when looking at your files through `explorer`. When you create a hard link, it will be as if the files are there. In the Windows world, soft links are what they call `symbolic` links and hard links, well, just hard links. Have a look at the <a href="https://technet.microsoft.com/en-us/library/cc753194(v=ws.11).aspx" target="_blank">documentation</a> for more information about `mklink`.

When we leave the dark ages we find that PowerShell can also create symbolic links using the `New-Item` cmdlet. **It too can create soft and hard links**, and uses the same naming as it's CMD brother. To do this, we make use of the `-ItemType` parameter. To create a symbolic link, use `SymbolicLink`. For hard links use, you guessed it, `HardLink`. As I'm not one to remember exactly how this works a month later, I've created a little function inside my `$profile` to help me out.

```powershell
function New-Symlink {
    param(        
        [Parameter(Mandatory = $true)]
        [string]
        $Source,
        [Parameter(Mandatory = $true)]
        [string]
        $Target
    )
    New-Item -ItemType SymbolicLink -Path $Target -Value $Source
}

New-Alias -Name sym -Value New-Symlink
```
The only caveat here is that you need to execute this in an elevated prompt. But don't worry, you'll be greeted with a nice little warning in case you forgot about that.

So, which files or folders have I created symlinks for? My `$profile`, `.gitconfig` and `ConEmu.xml` files are all symlinked. This way they can always **stay up-to-date between my machines and safely stored in the cloud** at all times. I wanted to link my `.ssh` folder too coming from <a href="https://keybase.io" target="_blank">keybase.io</a>'s file storage, but as that's mounted by my local user, the elevated prompt can't find that path. Good for security, less so for my convenience :-)

Remember this trick when you feel the need to have the same file or folder at two locations, or when you, like me, work on more than one machine with the same tools. **It's a simple way to make your life even easier**.