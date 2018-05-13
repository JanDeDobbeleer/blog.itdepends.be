---
categories:
- process
date: 2016-11-05T00:00:00Z
description: The current agile landscape is broken. Teams all over the world denounce
  agile and look for other options. But is this really the end?
tags:
- agile
- dead
- software engineering
- modern agile
- ci
- cd
- delivery
- deployment
- QA
- IT OPS
- automation
- team
- scrum
title: Agile is dead
url: /agile-is-dead
---

Last week I got to give a talk on my vision of how to go about software engineering and everything that accompagnies it. While I still want to write a few posts about that, the knowledge I gained by preparing this talk is something I'd like to share first. In the final month before the going live, I started listening to one or two podcasts each day. While most of them were about continuous delivery, there was one thing that came back all the time. Being agile no longer has the same meaning compared to 15 years ago. **Software engineering evolved** but our way of working didn't.

It came down to what I wrote in my previous post ["RE: The land that scrum forgot."](https://www.herebedragons.io/re-land-scrum-forgot). And this got me thinking, if the way we are being tought agile and it's frameworks no longer fit within how we need software to be delivered today, what else is there? **Are we stuck in some sort of interbellum** waiting for the next great values to help us get out of the always lurking scrummerfall? I assumed it had something to do with not properly implementing scrum, but I went through a transition too when it comes to scrum. I still value a lot it has to offer but still feel the need for something else.

It's only when I met [Modern Agile](http://modernagile.org/) by accident via Twitter, that I knew exactly what that was. Joshua Kerievsky's [keynote](https://www.agilealliance.org/resources/videos/modern-agile/) felt so familiar, it was like coming home. I'm not alone in this world after all. We've spend way too long trying to implement scrum and agile within development teams that we forgot there's a whole world out there that needs to be in on this. We can't be lean or agile if the company doesn't carry the vision and values and implements them everywhere. **Agile is not something you can do within 1 team only**. It can start there, but in order for it to succeed, it needs to spread.

The biggest problem of these movements however (including agile itself) is that without practices, these values amount to nothing. They melt like snowflakes in the sun. But given that this felt so natural and logical to me, what was it I was doing that allowed me to map these values? The answer appeared like wild Pikachu while listening to some more podcasts. **I'm doing devops**. And I didn't even know it. All of the practices I value and promote within the team are exactly that.

We want to deliver value continuously by creating a great sense of safety through our CI and the way we write our code and collaborate. We do this so that we can provide value to our customers and create awesome apps we love. Not just our users, we want to feel proud of what we do ourselves. The only way to achieve this is by **delivering quality** and being able to focus on what makes it great. This way we can expirement and learn, so we can adjust rapidly and improve our product.

I have never seen a team that is so close to it's end users. We proactively monitor everything we can. When our users talk about the app on Twitter, we know. When the ratings of our apps change, we know. When the stability of our apps drops, we know. And that's what makes us a team that implements devops. **We know**. Not someone in another team. No. We are the ones involved in the never ending cycle of our software, from writing code to going live and back.

And the only way to do this is to break down barriers and create a new team structure. Gone are the days of separate QA teams and IT OPS. We no longer need to have quality assurance, we need **quality engineers**. You want to have people in your team taking care of automating all those tedious tasks that guarantee nothing but a false sense of security. You want developers to know what the production environment looks like and have it configured themselves within the code base. You don't want to have to ask to someone to deploy your stuff to production, that should happen all the time because you automated all of this.

Does this mean there's no need for IT OPS anymore? No, we still need people who have an overview of all the production environments. You want to have that team in on key descisions when it comes to changes to that, but you don't need them to help you get code into production. IT OPS should be able to rely on you when it comes to problems in your environment instead of you being alerted by them if something is wrong. When IT OPS comes to talk to you (or anyone for that matter) about a problem, your answer should be **"We know and we are fixing this right now."**.

What it does mean is, kill QA. **Kill it with fire**. The keyword here is automation. Your ambition should be to automate everything. Even yourself. Every manual task that's done more than once should immediately ring a bell and be converted into a script or tool if possible (and most of the time it's possible). I've seen teams create amazing tooling they could later open source and share with the world just because they adopted this mindset. Entire spinoffs have been spawned just by doing this.

And yes, implementing this will hurt. Coming from an existing codebase it's hard work. But every day you let this slip because you are afraid to take the jump will only make things worse. The sad thing is, most of us know this. We are confronted with it every day. So no, **agile isn't dead**. We just need to start doing it properly.