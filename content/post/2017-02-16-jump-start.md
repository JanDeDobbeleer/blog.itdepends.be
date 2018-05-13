---
categories:
- people
date: 2017-02-16T00:00:00Z
description: Three years ago, I was a watchmaker and just started out in ICT. Now
  I lead a team of developers, give talks and teach about tech. How?
tags:
- software engineering
- IT OPS
- automation
- cli
- devops
- tool
- tooling
- continuous integration
- integration
- continuous
- unit test
- testing
- QA
- github
- gitlab
- git
- vcs
- make
- makefile
- build
- deployment
- continuous deployment
- cd
- pipeline
- watchmaking
- imposter syndrome
- talks
- teach
- improvement
- open source
title: Jump-start your ICT career
url: /jump-start
---

Four years ago, I decided being a watchmaker wouldn't get me anywhere so I started working on an exit strategy. As I was messing around with Linux and Android at the time, I figured I had to become an Android developer. After a bit of information gathering, I decided to go for a full-blown developer education at ACE Group T (currently known as <a href="https://www.mobyus.be/nl/graduaten/informatica" target="_blank">Mobyus</a>). The decision did complicate things, as our first-born son was only 5 months old, and it meant I wouldn't be at home at least 2 times a week, not including the countless hours of work that had to go into actually learning the craft. The following chapters are a rundown of what worked for me, how I went **from 0 to "hero"** (grain of salt) in ICT fast. I fully realize not everyone has the same background, but it contains a few things that could help anyone become better at what you do. Regardless of whether you are making your way into ICT or of you've been in it for far too long without advancing, it can provide insight in how to proceed to the next level.

### Getting started

When it comes to programming, **getting the basics right is a good idea**. Take the time to understand how computers and programming languages work, but feel free to experiment. Most people, whether they are a coder or watchmaker, tend to solve problems by creating a new problem to undo the effects of the initial problem. As a result, you end up with two bugs which can't be removed unless you know about both of them. Learning to really understand how something works and being able to solve problems by finding the actual issue is a craft you have to master while being at school. Why? Well, for starters, you've got all the time in the world. Coming from someone who studied while working as a watchmaker and becoming a father twice in a row while in school, take my word for it. You'll thank me later.

Once you feel comfortable programming, **take up a new challenge**. For example, creating mobile apps is a nice way to grow your skillset. They come with the same challenges as larger systems, only on a more manageable scale. You can learn about security, http requests, databases, application design, build and deployment automation and the ecosystem welcomes new kids on the block.

Another interesting approach is tackling issues on **open source projects**. You can have a look at [firsttimersonly.com](http://www.firsttimersonly.com/) to get started. Your portfolio will grow, you'll gain knowledge about a multitude of languages and might even become a respected member of one of the communities out there. To be able to do this brings us to another point, **take the time to learn as much as you can about tooling**. Nowadays, open source implies git, usually hosted on <a href="https://github.com" target="_blank">GitHub</a>. Knowing what git is, what additional features GitHub provides and how to handle all that without looking (or feeling) like an idiot, is a must for any developer out there.

In case you study after hours and don't yet have a job in ICT, go out and find one. If you can provide real samples of working code, on a device or deployed to a server, you'll be sure to land a job in no time. The best thing to do is to look for a QA or IT OPS role. You will gain a lot of insight into how things really work (_not only your end of the spectrum_), you'll get to see what works and what doesn't and you'll create that healthy dose of **"let's see what happens if I do this"** when you need to fix something that's not really documented anywhere (preferably in production). There's so much tooling I would have never known (or way too late) if I started out as a developer straight away. I didn't realize that at the time, nor did I really appreciate it back then, but in hindsight that's what gave me my first boost.

### The next level

It's insane how fast you can create legacy code without a way back that doesn't come with a lot of effort. Fresh out of school, you've probably seen a bit of unit testing, but understanding the importance usually isn't part of that. It was just part the curriculum. But, if you want to make it to the next level, learning how to create proper unit tests and **the implications this has on an application's architecture**, is key.

So, what can we do to facilitate the creation of unit tests? In my experience, patterns like MVVM and IOC, if applied correctly, allow for testable and flexible code. When you combine that with the benefits of practices like TDD, you will end up with code than can easily be changed when issues occur or once the feature set grows. And, to be clear, in my book, this isn't up for discussion. **A crappy architecture results in pain**, and a lot of it too. You want to be able to predict what a certain code change triggers. Ideally by just looking at the code as you've made sure components are loosely coupled within a well-defined, bounded context. Let me put it this way, if you're looking at code and must spend more than 10 minutes to find out what will happen when you change one line, you've got a problem. You can easily calculate the time lost by having a bad architecture, and trust me, it topples everything along the way. Learn how to avoid that and you'll become a code ninja in no time.

Once all that is up and running, you want a quick feedback loop to inform you of issues you weren't aware of. Because that _will_ happen, nobody is perfect and you can't hold every part of an application in your head forever. <a href="https://www.herebedragons.io/devops-part1" target="_blank">Creating a CI setup</a> is the simplest thing you can do to have this. There are a few caveats here though. You will need to gain insight and knowledge of available tooling. Both for building and testing the application. This starts at source control, your IDE, build tools and never really stops once you start going that road. Combine this setup with <a href="https://www.herebedragons.io/devops-part2" target="_blank">a CD pipeline</a>, and it will bring you and your code to the next level, because you can go fast. And trust me, **it's fun and addictive**.

### After hours

> As a disclaimer, do whatever you want with this. I'm not saying you can't advance by not doing this, but it made a world of difference for me.

We talked about picking up app development and engagement within the open source community. Obviously, this won't be possible during office hours. In order to benefit from this, you'll need to be prepared to invest quite a bit of time that you would normally spend on other things. I know a lot of people who choose to continue working on office projects while at home, hell, even I do that at times. But **if you really want to have an impact at work, don't do that**. Pick up a new language, learn about security or start a blog to write about your experiences, creations and thoughts. You will learn so much, even when you didn't expect to.

On that topic, battle the <a href="https://en.wikipedia.org/wiki/Impostor_syndrome" target="_blank">imposter syndrome</a>. I started blogging a year ago, 6 months after I graduated, and it seems people value what I write about. Bluntly put, if I can do this, so can you. Everybody has a story tell and knowledge to share. Yes, you'll make mistakes, but that doesn't matter if you're willing to learn and improve. Also, **don't be afraid to start giving talks**. It works like writing blogposts. Usually you've got a good idea what you want to talk about, once you start writing or creating slides, you'll realize there are a few gaps in your understanding of the topic. So, make sure to fill those holes and gain even more insight, feeling more confident and ready to proceed.

### Finally

Don't get discouraged along the way. ICT covers a lot of fields and you don't have to master them all. It pays to know about a lot of them to get a broader understanding on how stuff works, but try to focus on your passions and you'll be fine. If you remember one thing from this post, let it be **"Never stop learning and keep improving"**.