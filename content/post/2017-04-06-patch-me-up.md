---
date: 2017-04-06T00:00:00Z
description: Patch mode is git is something a lot of people have never heard of. I'm
  here to fix that.
tags:
- git
- cli
- tool
- tooling
- open source
- version control
- powershell
- github
title: Patch me up sir!
url: /patch-me-up
---

We've all been there, working on code and forgetting about source control for a few hours. In my case, this resulted in crappy, way too large commits once I was happy with the result. In the best possible outcome, I could split the changes into multiple commits when the changes span across different files, but most of the time that's not really the case.

It wasn't until a while back that I figured out git has a way of dealing with that. All this time I thought I simply sucked at source control and would never be able to master that craft on top of all the other skills. No. In fact, it's completely normal to forget about source control during programming and git can help you sort stuff once you're done being awesome. But how? Meet patch mode. In this example, we'll have a look at `git add -p`, but know that patch mode exists on a multitude of commands, not just add. I'll come back to that later, but let's start by looking `add -p` first.

As I said, we start off by having a lot of files and changes that, if we want to do the right thing, should be split into different commits. The problem isn't that we have multiple files, the problem is that we have a set of changes within 1 or more files which belong together. So, we need a way to split those files and keep some changes as modified, and stage others.

When we type `git add -p`, git will present us with something that looks familiar and other stuff that looks rather unfamiliar if you've never been here before.

    PS> git add -p

    diff --git a/_posts/2017-03-16-cover-all-the-things.md b/_posts/2017-03-16-cover-all-the-things.md
    index 4b3185c..646c9e0 100644
    --- a/_posts/2017-03-16-cover-all-the-things.md
    +++ b/_posts/2017-03-16-cover-all-the-things.md
    @@ -35,6 +35,9 @@ Lastly, we need to format and publish the results.
    
     ...
    
    +Look, I'm new here
    +I'm new here too
    +
     ...
    \ No newline at end of file
    Stage this hunk [y,n,q,a,d,/,s,e,?]?

The first part of this output looks like a diff, but we do see something else at the end. git talks about a _hunk_. If you change more than one line in a file, and provided they are more than a few lines apart, git will already split your file into multiple hunks. At the bottom, you can see git presents us with a few options. I'll only cover the ones I use the most, as those will also be the ones you'll be using the most. There's no need in complicating things 😊. You can type `?` to get a bit more information about every option.

    y - stage this hunk
    n - do not stage this hunk
    q - quit; do not stage this hunk or any of the remaining ones
    a - stage this hunk and all later hunks in the file
    d - do not stage this hunk or any of the later hunks in the file
    s - split the current hunk into smaller hunks
    e - manually edit the current hunk
    ? - print help

`y` and `n` are rather straightforward, we either chose to stage this hunk or not. `q` will get you back to your safe zone if you came here by accident. `a` can be used to stage this hunk and all the remaining hunks in the same file. `d` is like `a`, only that it won't stage this hunk or any remaining ones for that file. Quite boring you say? Yup, but we've reached the interesting part. Suppose the hunk you see before you contains changes you want to stage, but also a few lines you'd rather not stage right now. You could try to let git split the hunk for you using `s`, but that won't always work. When the lines are too close together, git will just repeat the same hunk over and over when trying to split it. In that case you want to use `e` and manually edit the diff. And that's an important concept. You will edit the diff, not the file itself.

Try pressing `e` and your editor will pop up containing the diff for the selected hunk. There's also a nice little companion text to guide you through this feature.

    # Manual hunk edit mode -- see bottom for a quick guide.
    @@ -35,6 +35,9 @@ Lastly, we need to format and publish the results.
     
     ...
     
    +Look, I'm new here
    +I'm new here too
    +
    ...
    \ No newline at end of file
    # ---
    # To remove '-' lines, make them ' ' lines (context).
    # To remove '+' lines, delete them.
    # Lines starting with # will be removed.
    # 
    # If the patch applies cleanly, the edited hunk will immediately be
    # marked for staging.
    # If it does not apply cleanly, you will be given an opportunity to
    # edit again.  If all lines of the hunk are removed, then the edit is
    # aborted and the hunk is left unchanged.

In the example above, two lines were added to the file. It displays two options depending on what you want to do. In case it's a removal, you have to replace the `-` with a space. That might seem straightforward but I've seen many people (including me at first) mess this up. Leave the line as is and just replace `-` with a blank space. That's all. In case we have an addition, lines starting with `+`, you simply need to delete the entire line to not stage that change. Remember, we are not editing the file itself, only the diff, implying, on our filesystem, the file will still contain all the changes. We will simply tell git which changes to stage and prepare for a commit. So, after the edit, you'll end up with this, if you wish to only keep the first line.

    ...
     
    +Look, I'm new here
    ...

In case you mess up, git will not apply the patch and tell you. You can either quit or modify the diff again to fix that.

Now, I said in the beginning that `add` is not the only command where you can use this mode. You can make use of this on `commit`, `checkout`, `reset` and `stash`. As it's a powerful feature and also iterates through every change you made, I use this all the time to review my changes and create nice, clean, contextual commits. It's almost like a second nature to simply use `git commit -p -m 'Some new code'` instead of adding every file separately or worry about my changes along the way. I can keep on coding and when I'm happy with the result I'll make sure to create an impeccable git log.

Are there any GUI's out there who support this, you ask? Sure, <a href="https://desktop.github.com/" target="_blank">GitHub for Desktop</a> allows you to stage individual lines, which is exactly what `git add -p` allows you to do. The ever so awesome <a href="https://www.gitkraken.com/" target="_blank">GitKraken</a> displays hunks when you click on modified files, where you can also add line per line. When it comes to git and GUI tools, I usually can't recommend anything useful that won't create even more confusion. That is, until GitKraken came along. You still need to know what it's all about, and no GUI can help you with that, but given that it uses the correct naming for its actions, that's the one I recommend if you're looking for a GUI tool to manage your git repos.

Now go out and have fun creating clean commits!