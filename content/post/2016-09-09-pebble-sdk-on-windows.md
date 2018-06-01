---
categories:
- dev
date: 2016-09-09T00:00:00Z
description: Now that we are the coolest kids on the block thanks to the WSL, we can
  get awesome stuff like the Pebble SDK to work on Windows. Read all about it!
tags:
- bash
- emulator
- linux
- pebble
- python
- sdk
- smartwatch
- watch
- windows
- wsl
- x server
- zsh
title: Running the Pebble SDK on Windows
url: /pebble-sdk-on-windows
---

Now that we are the coolest kids on the block thanks to the WSL, it's possible to get some awesome stuff to work like a Pokemon GO bot (and get banned along the way) or try out some tools which weren't really available to Windows users in the past. One of those is the Pebble SDK. **I'm intrigued by Pebble** but didn't feel like creating a VM just for that. Luckily for us, some folks over at <a href="https://www.reddit.com/r/pebbledevelopers/comments/4yssza/fyi_the_pebble_sdk_for_linux_works_with_the/" target="_blank">Reddit</a> already found out how to get it to work using the WSL on Windows 10. Let's dive right in.

## Install prerequisites

If we want the emulator to work we will need setup a Windows X server to actually see it running. You can install `VcXsrv Windows X Server` using Chocolatey on Windows.

```shell
choco install vcxsrv
```

Next up is telling the WSL which display to use by editing the `.bashrc` file (found in your WSL user's home folder). Add the line `export DISPLAY=:0` so the WSL will use the X Server to propagate graphics to (this will also allow you to get other graphical stuff to work like gitk for example).

Secondly we need some Linux libraries the SDK depends upon. **I added one extra library** compared to Pebble's own guide, `libfreetype6-dev`. When trying to compile after my installation, that lib was missing on my WSL setup, so make sure you have it before continuing.

```shell
sudo apt-get install libsdl1.2debian libfdt1 libpixman-1-0 libfreetype6-dev python-pip python2.7-dev
```

## Install the SDK

Now that we have all this, we can download the SDK to a destination of choice (you can do this on Windows or the WSL by using wget, just make sure you know where to find it from the WSL afterwards). From this point onwards, **everything we do is in the WSL**. Start by creating a folder where you want to host the SDK and navigate into it to unpack it. Make sure to alter the path to the SDK package if that's not where you downloaded it.

```shell
mkdir ~/pebble-dev/
cd ~/pebble-dev/
tar -jxf ~/Downloads/pebble-sdk-4.4.1-linux64.tar.bz2
```


Instead of adding the following line to our `.bash_profile` like Pebble tells us to do, let's add it to the `.bashrc` file as that does work (could be due to the fact I use ZSH instead of Bash on the WSL). This will add the SDK location to our path so we can use it.

```shell
export PATH=~/pebble-dev/pebble-sdk-4.4-linux64/bin:$PATH
```


Install the Python libraries needed to convert fonts and images from your computer into Pebble resources. Make sure you navigate to the correct folder.

```shell
cd ~/pebble-dev/pebble-sdk-4.4.1-linux64
virtualenv --no-site-packages .env
source .env/bin/activate
pip install -r requirements.txt
deactivate
```

Almost there now. Inside the SDK there is a file called `_socket.py` in which we need to remove the two lines referencing `TCP_KEEPCNT`. Pay attention to the path, it starts in the `.env` folder. **Make sure you get that right**.

```shell
cd .env/lib/python2.7/site-packages/websocket/_socket.py
vim _socket.py
```


Install the latest SDK and get ready to rock.

```shell
pebble sdk install latest
```

## What now?

Having installed the SDK, you can now proceed to create a Pebble app. It doesn't matter where you write your code, whether it is in the WSl using VIM or Windows using Code, you can now build and deploy from the WSL. Neat. I tried the following <a href="https://developer.pebble.com/tutorials/watchface-tutorial/part1/" target="_blank">tutorial</a> from Pebble and it **works like a charm**! Just make sure the X server is started on Windows before running the emulator or you will get rather confused.

Happy Pebbling!
