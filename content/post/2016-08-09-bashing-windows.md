---
author_profile: true
categories:
- dev
date: 2016-08-09T00:00:00Z
tags:
- agnoster
- anniversary
- bash
- cannonical
- cli
- dircolors
- linux
- ls
- oh my zsh
- oh-my-posh
- powershell
- rubby russel
- sudo
- ubuntu
- vim
- windows
- windows 10
- wsl
- zsh
title: Bashing Windows
url: /bashing-windows
---

Together with Window's anniversary update came the long awaited Ubuntu on Windows (Bash). In this post I will guide you trough on how to set this up so you can get a good experience and play around with it. My use case is, I want to use Bash commands and the Linux toolset on my Windows file system so I can benefit from both worlds.

> Thanks to the Creators Update, we can now also use our Windows tooling on Bash and vice-versa. This is pretty awesome as you'll be able to choose your shell and seamlessly integrate with Windows regardless of your choice.

### Installation

There are a few prerequisites before being able to start the Bash shell. First off, make sure your device is in developer mode. To do this, open `Settings / Update & Security / For developers` and enable `Developer mode`. Next up, enable the Windows Subsystem for Linux feature (WSL). Press WIN, type `features` and select `Turn Windows features on or off`. Scroll down and enable `Windows subsystem for Linux (Beta)`. Reboot your device to apply the changes.

Once rebooted, open a PowerShell prompt and type `lxrun /install /y` to install Bash. Hang in there as it can take a while. Installing it like this will log you on as root if you would start Bash right away. To start as a user, create a new default user using `lxrun /setdefaultuser <username>` and enter a password. We are now all set to get started with Bash on Windows!

> You can also install the Bash prompt by tapping WIN and typing `Bash` to start the download. But, to update or remove the shell (in case of issues) you will have to resort to the CLI tool. So it's best you know how to do that instead of relying on the auto on-boarding.

### Configuration

I quickly got annoyed by the default console Bash uses. Just like PowerShell, it's an annoying little bugger that lacks features, even with the latest improvements. I moved Bash to ConEmu to have more flexibility in customization. You can install ConEmu on Windows using <a href="https://chocolatey.org/" target="_blank">chocolatey</a>: `choco install conemu`. Add a task through the settings with a proper name (mine is Ubuntu Bash) and enter `C:\Windows\System32\Bash.exe ~` in the commands window.

<img src="https://www.herebedragons.io/images/conemusettings.png" alt="conemusettings" width="600" class="alignnone size-medium wp-image-1132" />

While messing around with Bash, I noticed <a href="https://github.com/JanDeDobbeleer/oh-my-posh" target="_blank">oh-my-posh</a> had it's color settings a bit wonky. In order to get everything aligned and looking crisp, I had to <a href="https://github.com/JanDeDobbeleer/oh-my-posh/commit/bb231e51a3f56928ef2b6ed5967e13d1f3de1cca" target="_blank">adjust those</a>. If you want my color scheme for you convenience, you find it <a href="https://gist.github.com/JanDeDobbeleer/71c9f1361a562f337b855b75d7bbfd28" target="_blank">here</a>. The font I use is Meslo LG M, there is a great <a href="https://github.com/ryanoasis/nerd-fonts" target="_blank">repository</a> containing a wide variety of extended Powerline fonts.

Getting started with Bash also means we have to make sure it's setup properly. Let's create the root password before doing anything else. Start Bash using ConEmu or press WIN and type `Bash` to see and start `Bash on Ubuntu on Windows`. If all went according to plan you should be logged in as the user you created which is also added to the sudoers file, meaning we can sudo all over the place (rejoice). Add a root password by typing `sudo passwd`. First, enter the password you created for your user, then enter a root password when you see `Enter new UNIX password:`. Well done, you can now log on as root if needed.

Just like <a href="http://www.hanselman.com/blog/VIDEOHowToRunLinuxAndBashOnWindows10AnniversaryUpdate.aspx" target="_blank">Scott Hanselman</a>, let's start by updating everything we have before continuing. Type `sudo apt update`, enter your password and let it run. Once done we can install all the goodies needed to have a cool prompt. Linux has the advantage of having a lot of great CLI improvements compared to Windows. I created oh-my-posh because I got inspired by tools like <a href="http://zsh.sourceforge.net/" target="_blank">ZSH</a> and <a href="https://github.com/robbyrussell/oh-my-zsh" target="_blank">oh-my-zsh</a> so obviously, that's what I'm going to install before continuing. Start off by installing git, ZSH and oh-my-zsh.

```shell
$ sudo apt install git zsh
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```


You can now type `zsh` to start the ZSH prompt, improved by oh-my-zsh. Have a look at the repository <a href="https://github.com/robbyrussell/oh-my-zsh/wiki" target="_blank">wiki</a> to see what is available. I use the agnoster theme, you can change the theme by using VIM to edit the `.zshrc` file which lives in your user's home folder: `vim ~/.zshrc`. If you have no idea how to use VIM, now is the time. There are plenty of <a href="http://vim.rtorr.com/" target="_blank">cheat sheets</a> out there. Let's swap the default theme for Agnoster:

```shell
ZSH_THEME="agnoster"
```

We want to start ZSH when we start the Bash shell, so let's tell Bash to do so. Use the following command to achieve this:

```shell
$ echo 'ZSH' >> ~/.bashrc
```

The subsystem lives next to Windows and has access to the Windows filesystem. It doesn't map onto the Windows filesystem however, meaning you have a different home folder in Linux and in Windows. For me, this is kind of annoying as I want to use Bash on Windows, not somewhere on my machine in an entirely different context. I want to use the same SSH keys, git configuration and other settings on both shells. To achieve this, we have to tell Linux our user's home folder is the home folder we use on Windows (`/mnt/c/Users/<username>`). Edit the `/etc/passwd` file with VIM to change your home folder's location.

```shell
$ sudo vim /etc/passwd
```

In my case, I had the following line at the end:

```shell
jan:x:1000:1000:"",,,:/home/jan:/usr/bin/Bash
```


You have to look for the one starting with your username. We need to change the `/home/jan` path to our Windows home folder. Alter the line so it looks like this but with your Windows username:

```shell
jan:x:1000:1000:"",,,:/mnt/c/Users/Jan:/usr/bin/Bash
```

The last part of this line indicates the shell Linux has to start for your user. You can tell Linux to start ZSH instead of Bash but for some reason this never worked for me. To make sure the settings we just configured are used when we restart our shell, let's transfer all the files from the Linux home folder to our Windows home folder. Beware that if you use Cygwin or Git Bash, this will override those settings so use with caution (or adjust to your needs). Replace the usernames with your own
and copy-paste all the files and folders:

```shell
$ cp -R /home/jan/. /mnt/c/Users/Jan
```

Use VIM to edit the `~/.zshrc` file and adjust the home location of oh-my-zsh to it's new Windows home folder. Restart the Bash shell to apply all the changes. You notice you are now in your Windows home folder instead of the Linux subsystem. Great. There's only one thing left to do now. When we type `ls` or `cd`, the output and autocomplete looks quite ugly. This is because Windows has no permissions on files and folder apart from admin, meaning everything will be defined as `STICKY_OTHER_WRITABLE`, `OTHER_WRITABLE` and `EXEC` when it comes to lS colors. To alter this we need to override these settings by creating a .dircolors file in our home directory with adjusted values. Create the file with the current settings:

```shell
    $ dircolors -p > ~/.dircolors
```

Now, edit the `.dircolors` file with VIM and look for the following settings. Change the values as illustrated below.

```shell
    STICKY_OTHER_WRITABLE 01;34
    OTHER_WRITABLE 01;34
    EXEC 01;37
```

Lastly, we need to tell ZSH to use the ls colors for completion, add the following line at the end of your `~/.zshrc` file using any editor of choice.

    zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}


Restart the Bash shell and the result should look like this. I have almost the same UI on PowerShell (left) and Bash (right), which makes it nice to work with. Who said we can't have a nice console on Windows? I can't wait to mess around with it!

<img src="https://www.herebedragons.io/images/bashing_windows.png" alt="Screenshot_18" width="600" class="alignnone size-medium wp-image-1150" />
