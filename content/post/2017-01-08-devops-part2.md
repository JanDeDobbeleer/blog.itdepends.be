---
categories:
- process
date: 2017-01-08T00:00:00Z
description: What did I learn through adopting a devops mindset within myself and
  the team. Part II tackles continuous delivery.
tags:
- software engineering
- IT OPS
- automation
- cli
- command line
- shell
- GUI
- devops
- cool
- tool
- tooling
- continuous integration
- integration
- continuous
- unit test
- testing
- QA
- github
- bitbucket
- vsts
- visual studio
- team services
- vso
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
title: Devops workflow Part 2 - Continuous Delivery
url: /devops-part2
---

Now that we've got CI covered thanks to part 1, it's time to tweak our pipeline to allow continuous delivery (CD). The traditional model where developers only worry about writing code is dead. What I aim for in a team is ownership throughout the entire process. **It's impossible to deliver value when you're not in control of your own product**. Which means the impact of implementing CD is not to be taken lightly. It will force you to streamline your CI setup, gain knowledge in areas you never had to care about before and, at times, make you lose your mind. But, once set up, it provides a lot of freedom. The freedom to experiment, discuss features and create a better product for everyone out there.

When I mention this model to people who have no previous experience in this field, they call me crazy. Most of them, whether their background is in code or not, do not believe this can work. For me, after playing with it professionally and in my own projects, **it's the only model I believe in**.

It all started by looking for a way to implement an agile mindset and framework in our team, and initially, I failed to find the practical side of things. One of the reasons scrum fails for most of us is that we focus so much on the process and artifacts, we forget **you must change stuff everywhere to benefit from it**. You can't renovate your house without tearing down a few things. Adding paint to a wall that does not fit your needs will not be an improvement in the long run. In software development that's what most of us are doing, we add a bit of paint each time we realize what we have doesn't work for us. I'm here to tell you, tear down that wall, ceiling, your entire house if that's what it takes. **You can't have freedom by staring at walls**.

### Definition

> Continuous Delivery is the ability to get changes of all types—including new features, configuration changes, bug fixes and experiments—into production, or into the hands of users, safely and quickly in a sustainable way.

When you go out on the www and look for a definition of CD, you'll find a lot of flavors. I've chosen the one above as it aligns with the evolution I went through. It's important we take a good look at what this says. When we break it down we can find a few important items we need to explain a little more. As you notice, if you've read part 1, we can find some of the things I talked about in this definition. It's about getting features, changes, fixes or experiments out in a safe and fast way. So, **making sure your CI is setup and working reliably is a cornerstone of implementing CD**. You simply can't proceed to this level unless you've got that covered. If you can't rely on the output of the pipeline you've got today, there's no benefit in extending it yet. Make sure that part has matured enough to be reliable.

The second part is what CD is all about, "_into production, or into the hands of users_". That's right. Straight to that scary environment. And not manually, no, fully automated. No way back. I know, **this scares a lot of people**. But it changes the world. It changes the entire organization. Going to production or a subset of it requires a change in mentality, it requires you to rethink how your code is written, deployed, maintained throughout that entire lifecycle.

### The real world

So, what's the benefit? In my experience, **it's a lot more fun** to create software this way. Instead of having to wait for feedback, you can get it straight away. Working on a feature? Ship it. It doesn't even have to be finished yet, you could just be testing the UI to see if people find what you are trying to implement. If you don't want to hand that to everyone, no problem, you can use feature flags and awesome platforms like <a href="https://launchdarkly.com/" target="_blank" >LaunchDarkly</a>. Just make sure they are short-lived as it can get out of hand.

Or maybe you have no intention to add needless complexity to your codebase? No problem, push everything to a subset of users first. We use a beta track where people can request access to. **It's our playground** to validate what we build is doing what we want. This way we catch issues early on and as you've got a fast delivering pipeline, you can fix forward and no longer worry about that. Putting smaller parts of code out there continuously greatly **reduces the effort needed to fix something**. You'll be able to pinpoint issues a lot faster and mostly can fix it before too many people notice it.

Yes, that means you also must make sure you can see how your code behaves in production. Isn't it weird that OPS teams monitor how your code behaves? Let alone that they are the ones fixing it. Something **too often mistaken for being devops** by a lot of people. If you write code and are not involved actively in monitoring its status in production, you are doing it wrong. Making sure you can get this vital information starts by making it part of how you write code in the first place.

And behaving is not only about the technical status, it's also about the people using it. How do they feel about that new feature, design, improvement? **How do they feel about your product today**? Do you know? In my team, we monitor Twitter to get that information. Even if it is just one of the platform people share feedback on, we get a good idea of the features people are looking for or what their frustrations are when working with our product.

Given that we work on mobile apps all the time, we've automated a few things we want to know in realtime. We've automated Twitter queries and app store reviews to show in Slack. We even have a dashboard that shows our most important metrics, like store ratings and crash free rates. And yes, that implies **we work closely together with product owners and marketing** to use that information to create a better product. They must be part of the team.

### Experts

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Don&#39;t call this DevOps.<br><br>I dare you. I double dare you. <a href="https://t.co/qR6FwglGbn">https://t.co/qR6FwglGbn</a></p>&mdash; ma.ttias.be (@mattiasgeniar) <a href="https://twitter.com/mattiasgeniar/status/816709557296758787">January 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I love this tweet by Mattias Geniar where he's a little frustrated about what people are calling devops. And he's right. Setting up everything you need to make this happen quickly makes you realize this goes well beyond just writing code. When it comes to security and infrastructure for example, **you can't expect to have all that knowledge within your team**. When you are looking at how to measure the impact of what you create, you need people who know how to do that. Same goes for a lot of other fields of expertise out here. So yes, if you want to do this at a scale that's no longer simply experimenting, you need experts on the matter.

There's so **much more to devops than simply deploying and maintaining applications**. For me, that's where it all started a few years ago, but there's a whole world out there with people adopting devops in their daily workflow. Tools like <a href="https://www.terraform.io/" target="_blank">Terraform</a> or <a href="https://puppet.com/solutions/infrastructure-as-code" target="_blank">Puppet</a> that enable _Infrastructure as code_ expand the devops ideology beyond that, allowing you to setup an entire new production environment with the least possible effort and timespan.

This year marks my start for exploring the devops mountain. I've seen the base, explored a few paths leading up and gained a lot of experience doing so. Six months ago, I had no idea what this was all about. Now **I can't wait to reach the top**.