---
categories:
- code
date: 2016-03-19T00:00:00Z
description: After playing with ZSH and Tmux on Linux I felt left out on Windows.
  But, even if it goes against popular belief, it is possible to have an awesome shell!
tags:
- .NET
- agnoster
- chocolatey
- cli
- command line
- conemu
- git
- github
- posh-git
- powershell
- ps-agnoster
- shell
- theme
- tmux
- windows
- zsh
title: Shell shock
url: /shell-shock
---

> PS-Agnoster has been converted to Oh-My-Posh!. The Agnoster theme is now part of a family of themes which can be easily extended with your own. Have a <a href="https://www.herebedragons.io/oh-my-posh/" target="_blank">look</a>.

Last week I was messing around with Linux as I needed to be able to use a Windows unfriendly tool. Given that it was 7 years ago I seriously used Linux, I asked some colleagues to help me with the setup. What I saw blew my mind. They all had nicely pimped out terminals, allowing them to easily navigate between different tabs and windows, even windows within windows. I couldn't wait to setup all that stuff on my machine.

I started with <a href="http://zsh.sourceforge.net/" target="_blank">ZSH</a>, added <a href="https://github.com/sorin-ionescu/prezto" target="_blank">prezto</a> for that extra oomph and used <a href="https://tmux.github.io/" target="_blank">tmux</a> to top it all off. You can setup all this in less than 5 minutes, you don't even need to have a GUI running. I SSH into a CentOS Vagrant box that has all of this set up. Trying out some themes and looking at other people's setup I came across Agnoster.

<img src="https://gist.githubusercontent.com/agnoster/3712874/raw/screenshot.png" width="600" />

How nice is that? I was used to having git info in my Powershell prompt already as I use Posh-Git for that but this was on a whole other level. You don't see things like that on Windows machines. Not because it can't be done, but people usually do not use a shell or aren't bothered with making it better. I guess most .NET developers see it as a necessary evil rather than a powerful ally.

I found myself in an awkward situation, I was more comfortable in my Linux machine than on my beloved Windows 10. I started looking around because I couldn't possibly be the first person on this planet with the urge to have a great shell experience on Windows. Tmux on Linux gives you a nice way to spawn new shells within you current window or a new tab. When you are used to working in single window Powershell (or CMD if you like it oldschool) this offers a new dimension. After a bit of Googling I found myself on Scott Hanselman's <a href="http://www.hanselman.com/blog/ConEmuTheWindowsTerminalConsolePromptWeveBeenWaitingFor.aspx" target="_blank">blogpost</a> about ConEmu. It has quite a lot of features so get ready to spend some time going through them all, it's worth your while. But in case you are lazy, here's my <a href="https://gist.github.com/JanDeDobbeleer/e22a5fa034caa84dd5cb" target="_blank">setup</a>.

Even with this in place I still missed out on the awesome themes. Sure, you can change the colors but it's still the same old shell. There is a repository on Github by Chris Benti called <a href="https://github.com/chrisbenti/PS-Config" target="_blank">PS-Config</a> that mimics Agnoster and quite well also. It only had a few issues when I used it. The powerline font I use in my ConEmu setup worked for my ZSH shell but not with PS-Config. When I used the PS-Config advised fonts it was the other way around.

Being curious how this all worked I decided to tweak it and also add the Posh-Git output as I quite like that. It took me a few days but I did it. I now have the experience I look for on Windows. There's a few minor things I still need to add (elevated prompt, last command state) but you can get started with PS-Agnoster right now.

<a class="github_link" href="https://github.com/JanDeDobbeleer/oh-my-posh" target="_blank" >Source code</a>
