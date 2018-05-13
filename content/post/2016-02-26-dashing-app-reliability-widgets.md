---
categories:
- automation
date: 2016-02-26T00:00:00Z
description: Monitoring your apps can be a chore. But we can remedy that using the
  right tools.
tags:
- automate
- crash
- crashlogging
- crashlytics
- dashing
- fabric
- insights
- ruby
- widget
- xamarin
title: Dashing - App reliability widgets
url: /dashing-app-reliability-widgets
---

Ever since we started building apps, the crashes were logged and looked at "regularly". What this meant was that we knew when new issues arose and acted to solve them, but we never really actively monitored it. In 2015 one of the team goals was to actively check the crash rate and make sure it did not go below 99%. So, every time our CTO asked, I replied that indeed we looked at it on a regular basis and told him not to worry. After a while that became quite annoying as, yes, sometimes we did not really look at it because of reasons and I had to quickly look it up to see if things were tiptop.

Having learned about <a href="http://dashing.io/" target="_blank">Dashing</a>, the exceptionally handsome dashboard framework, I thought this might be able to resolve that very issue. Unfortunately there were no widgets for Crashlytics or Xamarin Insights to be found. So, what does a developer do? He goes out and hacks his own widgets. The widget turns green when the rate is over 99%, orange between 99% <-> 90% and purple (because it has been beaten the hell out of it) below 90%.

This is one of these things that creates peace of mind for me as the dashboard is visible for anyone who walks by. Our CTO no longer has to ask what the state is, it's right out there. It also means developers, me included, can no longer hide if things go wrong. It creates a more professional atmosphere. We stole the Dashing idea from our operations team and other teams have begun creating their own dashboards too. Not because they had to, but because they are proud of what they do and want to do even better.

{% gist 51b0db9aa37ae0dfb417 %}