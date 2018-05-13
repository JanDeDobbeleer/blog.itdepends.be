---
categories:
- dev
date: 2016-09-27T00:00:00Z
description: Bored of doing stand-ups? Maybe you don't see the point anymore, or feel
  it's a waste of precious time. We took control by going down a different path.
tags:
- chocolatey
- commit
- git
- github
- gnupg
- gpg
- gpg4win
- keybase
- keybase.io
- powershell
- sign
- signature
- signing
- trusted
- windows
title: Sign commits on Windows using Keybase.io
url: /sign-commits-keybase
---

One of the things I never really did until now was sign my GitHub commits using a GPG key. Which is rather silly given the fact I have a <a href="https://www.keybase.io" target="_blank">Keybase.io</a> account and even encrypt my Facebook email notifications with it. As **I'm just a mere mortal** and can't get verified on Twitter, I have to look for other ways to prove my identity. By signing commits, we can get verified on GitHub which is, let's be honest, all we need in life ;-).

> Before you proceed, this tutorial assumes you are on Windows and have a Keybase.io account and their <a href="https://keybase.io/download"
                              target="_blank">CLI tool</a> installed on your machine. Everything I illustrate is done using PowerShell, running in ConEmu (might not be important, consider this a disclaimer where I say "Works on my machine™").

Before we get started, let's make sure we have everything we need in order to proceed. To get GPG to work nicely with git on Windows, we have to install <a href="https://www.gpg4win.org/" target="_blank">gpg4win</a>. There are 3 versions to choose from, I took the vanilla flavor as **I have no need for GUI** (who does, really) and just want to work with GPG keys using the CLI. Fire up chocolatey and install.

    $ choco install gpg4win-vanilla
    

If all went according to plan, chocolatey also added the tools we need to our PATH. This means we can instantly import our GPG key from Keybase.io into GnuPG. In case you added the git UNIX tools to your PATH, make sure you select the correct gpg.exe. The one we just installed can be found under `C:\Program Files (x86)\GNU\GnuPG\pub`. If we have multiple keys, Keybase will list them when using `keybase pgp export`. If so, make sure to specify the correct key using `keybase pgp export -q <ID>` in the commands below. Let's start by importing our public key first.

    $ keybase pgp export | gpg --import
    

Next up we can import our private key.

    $ keybase pgp export --secret | gpg --allow-secret-key-import --import
    

If we would use the key right away, git will warn us **the key can't be trusted**.

    gpg: WARNING: This key is not certified with a trusted signature!
    gpg:          There is no indication that the signature belongs to the owner.
    

To remedy this, we are going to alter the key and trust it. Get the ID by listing the keys.

    $ gpg --list-secret-keys
    C:/Users/Jan/AppData/Roaming/gnupg/secring.gpg
    ----------------------------------------------
    sec   4096R/F6993303 2016-06-15
    uid                  Jan De Dobbeleer <jan.de.dobbeleer@whatever.com>
    uid                  Jan De Dobbeleer <jan.dedobbeleer@somecompany.com>
    uid                  Jan De Dobbeleer <jan.de.dobbeleer@somewhereelse.be>
    ssb   2048R/1CF963A4 2016-06-15
    ssb   2048R/E50FAEB3 2016-06-15
    

In my case, the ID is `F6993303`. Copy it so we can ask GnuPG to start trusting the key. To achieve this, use the trust command while editing the key using `gpg --edit-key`. In case you are curious about the different commands at your disposal, type `help`. **There are a few levels of trust**, we know the origin of our key so let's go with `5 = I trust ultimately`. Below is the output you can expect.

    $ gpg --edit-key F6993303
    gpg> trust
    Please decide how far you trust this user to correctly verify other users' keys
    (by looking at passports, checking fingerprints from different sources, etc.)
    
      1 = I don't know or won't say
      2 = I do NOT trust
      3 = I trust marginally
      4 = I trust fully
      5 = I trust ultimately
      m = back to the main menu
    
    Your decision? 5
    Do you really want to set this key to ultimate trust? (y/N) y
    

One small remark, in case the email address you use for GitHub is not part of the key, **you have to add it**. Edit the key and use the `adduid` command to add your name, email and a comment. Don't forget to use the `save` command after editing your key. You are ready to add your GPG key to GitHub and get verified commits. Copy the public key and add it to your GitHub profile under `Settings/SSH and GPG keys`.

    $ gpg --armor --export F6993303 | clip
    

Let's tell git to use our GPG key to sign the commits and sign all commits by default. In case you don't feel like signing everything, you can do so manually on each commit by using `git commit -S` to sign them.

    $ git config --global user.signingkey F6993303
    $ git config --global commit.gpgsign true
    

Try to sign a commit and push it to GitHub. The first time, GnuPG will prompt for the password. Once entered, it will be stored in memory for this session so we don't have to provide it going forward. If all went according to plan, you can now see your verified commit in GitHub. You can click on the `Verified` button to see more information about the signature.

<img src="https://www.herebedragons.io/images/verified.png" alt="verified" width="600" class="alignnone size-medium wp-image-1197" />

If you want to see the signature of the commit using the CLI (assuming it's the one on top of your history), use `git log HEAD --show-signature -1` to display the same (and more) information you saw on GitHub.

    $ git log HEAD --show-signature -1
    commit 66806fdf39a23cc504b66a472b5eb6c7a79ccefe
    gpg: Signature made 09/27/16 08:30:05 Romance Daylight Time
    gpg:                using RSA key 2E2E801DE50FAEB3
    gpg: Good signature from "Jan De Dobbeleer <jan.de.dobbeleer@gmail.com>" [ultimate]
    gpg:                 aka "Jan De Dobbeleer <jan.dedobbeleer@vikingco.com>" [ultimate]
    gpg:                 aka "Jan De Dobbeleer <jan.de.dobbeleer@outlook.be>" [ultimate]
    Author: Jan De Dobbeleer <jan.de.dobbeleer@gmail.com>
    Date:   Mon Sep 26 20:03:57 2016 +0200
    
        This commit is verified!
    

In a day and age where accounts are being hijacked all the time and **internet security is still sort of a joke**, it's not a bad idea to use GPG keys to verify your identity. The setup has never been easier so there are no excuses anymore not to do it. Take a look at Keybase.io if you haven't already and start verifying all your accounts (get in touch if you need an invite)!