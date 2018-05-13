---
categories:
- automation
date: 2016-03-03T00:00:00Z
description: There's no way to automate the submission of your Windows app. Until
  now.
tags:
- Android
- api
- automate
- cd
- ci
- continuous
- deployment
- fastlane
- integration
- iod
- selenium
- store
- windows
- windows store upload
title: Fastlanium - Automate Windows Store app submissions
url: /fastlanium-automate-windows-store-app-submissions
---

One of the things that remains hard in software development regardless of the area you work in is the relationship with business stakeholders. Scrum tries to remedy that by adding a sprint review meeting to the planning, but as most of us know, people are busy and people will not show up. Does that mean they don't care? Well, no, but there's a lot to be done and everyone has priorities. And mostly, once the briefing has been given about what needs to be done, the business section moves ahead. Time is money. Scrum masters will cry and say it shouldn't be that way, I say wake up and smell the damn coffee.

That still left us with the issue that nobody from the business stakeholders actually tested the apps during development (or asked about progress for that matter). The only solution in this fast paced world is to bring the apps to them, automatically and on a scheduled basis. Because they do use them, but only when everything is being handled by unicorns in a basement. And what are we good at? Putting those unicorns in the damn basements.

In order to provide everyone with the latest changes we decided to automatically upload a build at the end of every sprint, delivered straight to the store so that the apps would update automatically and everyone could provide feedback. Both our Android and iOS apps have the ability to be submitted through command line, one of the tools we use for this is <a href="https://fastlane.tools/" target="_blank">fastlane</a> (I can recommend that). The only problem that remains is our Windows Store app. Microsoft has no interface you can call to interact with the store which meant I had to manually upload a build every time. Rather time consuming when you know how slow that site can be.

Nothing better than a good flu to get rid of some frustrations. Or at least, that must have been what I thought when I wrote Fastlanium in between my power naps. The tool uses Selenium together with the Chrome driver to create a submission, upload the builds to the store and press the red button. No real magic but someone had to do it. With this tool I can now use my CI instance to do a deploy every week with the latest changes. Let's hope Microsoft wakes up and will allow store uploads through an API soon, and in the meantime, try Fastlanium.

<a class="github_link" href="https://github.com/JanJoris/Fastlanium" target="_blank" >Source code</a>