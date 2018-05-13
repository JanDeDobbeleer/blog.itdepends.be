---
categories:
- process
date: 2016-05-09T00:00:00Z
description: After watching Robert C. Martin's session at NDC 2011 I felt the need
  to rebel against the self proclaimed Scrum instances to create better software.
tags:
- agile
- cd
- certification
- ci
- code
- devops
- extreme programming
- keynote
- qa
- Robert C. Martin
- rot
- scrum
- Scrum Alliance
- scrum master
- scrum.org
- software craftsmanship
- tdd
- technical debt
- Techorama
- XP
title: 'RE: The land the Scrum forgot'
url: /re-land-scrum-forgot
---

As a software developer it happens I got nuts about a conference session or keynote. This is exactly what happened when I watched the video of Robert C. Martin's "The Land that Scrum Forgot" at NDC 2011. A colleague of mine told me to have a look as, according to him, it would be something I could appreciate. And I did. I suggest you watch it before continuing. In fact, I don't even care if you continue afterwards, **just take the time to absorb his talk**.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hG4LH6P8Syk" frameborder="0" allowfullscreen></iframe>
I watched that in awe. He stated just about everything I noticed over the past years in software development and what is wrong with the way Scrum is being thought to people all over the world. You can't have speed without practices. When I went to get my Scrum Master Certification, **I only saw managers**. Not a single developer. And while the course looked at everything from a Scrum framework principle, it lacked all the insights on how to reach those results. Which is rather strange, given that the two can't live without one another.

> Scrum teams can move very, very fast. At first. But something happens. What was it that was not taught in the CSM course? Practices. Software practices. When you are going fast, you need something that keeps you clean. Something that keeps the code from rotting.

And that is exactly what I witness in (software) companies today. Scrum has become the de facto standard if you want to build software. So everyone either tried or is trying to implement it. All these people focus on the scrum artifacts, appoint someone as scrum master (if that even happens) and go on to create scrum boards and backlogs. But most of the teams changing the way they work never work towards getting their code on a level that supports agility. Because nobody taught them how to do that. So they keep on building on top of that, might reverse engineer around some issues and maybe get to the point where they have a CI/CD instance running. That instance is then managed by operations who are deploying the output to production. And **everyone gets a pat on the back for being so agile**.

Typically these situations create a lot of friction due to going back and forth to get things right. Why is that? Because developers are not responsible for whatever goes live. Operations and QA are. If we want to have agility, we need to put the responsibility in the hands of the creators. We need leads who understand the need for a proper infrastructure. Who encourage and enforce TDD, Clean Code, Continuous Delivery and everything that accompanies it. So yes, we need to re-educate people about Extreme Programming (XP) and Software craftsmanship. Because **there's nothing extreme about it**. It's normal. And we have to get used to that.

In an ideal process, there is no need for operations nor QA. All of that can be automated. You need a real definition of done and enforce that with the tools at your disposal. Which most of the time do not even cost a penny. But still we rather spend 1000 dollars per month on Scrum tools than setup a proper and mostly free CI/CD instance, or spend our days writing requirements instead of writing unit tests. No. In the end we'd even prefer to **switch back to waterfall** for that fake sense of security, make development cycles even longer, because Scrum didn't work for us.

But Scrum does work, just not by itself. And I blame the current Scrum authorities for it's "failing". They sold out. They did not focus on making great software, they focused on making money. I was at <a href="http://techorama.be/" target="blank">Techorama</a> last week and watched <a href="https://twitter.com/ullizee" target="blank">Gunther Verheyen</a>'s keynote about the "The future present of Scrum". And while I liked what he said, I can't help by thinking of it as **too little, too late**. Yes, we should look towards what practices like XP taught us, yes we have to keep and make codebases clean, but why didn't I hear about this before? Why is no-one teaching this at Scrum certifications? What use is it when managers (who then turn into Product Owners) don't know about the necessity of it all?

So I propose we do not move away from Scrum. No. Let's make it what it needed to be all along and instead **move away from the self-proclaimed Scrum authorities**. And if you have to remember one thing Robert C. Martin said, let it be this one:

> The code can rot just as fast as you are going. You cannot have speed without quality, you cannot have speed with technical debt.