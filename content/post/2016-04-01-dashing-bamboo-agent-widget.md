---
categories:
- automation
date: 2016-04-01T00:00:00Z
description: Show your Bamboo Agent status (Building - Idle - Offline ) in a Dashing
  widget with colors and a configurable refresh rate.
tags:
- bamboo
- cd
- ci
- continuous
- dashing
- delivery
- gist
- github
- integration
- jenkins
- nokogiri
- ruby
- widget
title: Dashing - Bamboo Agent widget
url: /dashing-bamboo-agent-widget
---

Sometimes, in software development, you come across missing implementations in paid tools that you can't possibly comprehend. One of those I recently hit was the fact that Bamboo's Rest API does not provide information about the state of a build agent. WTF, right? As we had a few failing or hanging agents in the past I wanted to see what they were doing using our <a href="http://www.herebedragons.io/dashing-app-reliability-widgets/" target="_blank">Dashing dashboard</a>. There is a <a href="https://marketplace.atlassian.com/plugins/com.edwardawebb.bamboo-agent-apis/server/overview" target="_blank">plugin</a> that allows you to query the state of every agent but it was not reliable enough to use in production. So once again I had no other choice than to write a scraper to get the information I needed.

I'm still amazed at how awesome Ruby is whenever I feel the need to create another Dashing widget. Thanks to <a href="https://twitter.com/vbsteven" target="_blank">Steven Van Bael</a> I learned about <a href="http://www.nokogiri.org/" target="_blank">Nokogiri</a> and this was the ideal widget to put it to use. It took me about one hour to create and now, every 10 seconds the agent information is correctly updated. So whenever my friends at operations decide to reboot our build server, I know. I'm watching you, boys!

{% gist 6df1ffd1ae5ae522ab45c8783ab85ea5 %}