---
categories:
- process
date: 2016-12-17T00:00:00Z
description: GitHub pages can be a nice default but what if we wanted more features
  and not pay a single penny?
tags:
- software engineering
- automation
- devops
- tool
- tooling
- continuous
- github
- git
- build
- deploy
- netlify
- cloudflare
- dns
- staging
- preview
title: Continuous deployment for your blog
url: /continuous-blogging
---

I've been playing with the setup of this blog for quite a while now and seem to have found a setup that matches my desires. I needed a painless static website and GitHub pages with Jekyll provides just that. After playing with a lot of themes and finally tweaking the one I liked most, writing posts was **a lot less painful** and fitted right into the workflow I already knew as a developer. Write words, push to git, see the result. Easy. Continuous deployment in its purest form.

A while back, there was no option to enable SSL on GitHub pages but that changed recently. If you're not looking for more, this might be all you need, but in my case, I was looking for a few more options. But what service out there enables a lot of cool stuff? For free? Enter [Cloudflare](https://www.cloudflare.com/), a versatile tool that I originally approached as just another name server but boy, **was I wrong**. Coming from Wordpress where I could tweak my `.htcaccess` file to achieve http to https redirects or adjust response headers to further secure my site, GitHub pages is quite the letdown on that part.

Cloudflare can solve most of that. It has edge to edge encryption using an SSL certificate for your site that's shared with others (which can turn out to be [quite the company](https://www.troyhunt.com/should-you-care-about-the-quality-of-your-neighbours-on-a-san-certificate/)), you can set page rules to redirect to http to https (3 free rules are available), there's the option to enable HSTS settings that allows for preload submission and you can enable auto minifying of CSS, JS and HTML pages. On top of that, you have access to analytics, extra tooling like page banners (outdated browsers, status message), threat protection and caching. Awesome. The **setup is a breeze** too, just use Cloudflare as you name server and you are good to go. They have guides for most registrars out there but that should be rather straightforward.

With all of this enabled, I was feeling pretty good about my setup. When I work on my site, I can turn off the Cloudflare caching for 3 hours (developer mode) to instantly preview the changes. It only takes a few seconds for GitHub to build and deploy which creates a **super-fast feedback loop**. And of course, we'll do it live. Only one thing was missing. Jekyll has the option to set custom headers by tweaking webrick in your config, but this does not work on GitHub pages. This means I'm unable to add a `X-XSS-Protection` or `content-security-policy` header. Given that I aim to set the example for other people out there, it didn't feel right.

A month passed and I almost forgot about the header issue when, by accident, I read a tweet mentioning [Netlify](https://www.netlify.com/) as a hosting solution. I never heard of Netlify before so I set out to **explore that strange new world**. It turns out Netlify can build Jekyll sites out of the box and allows for a ton of tweaks, including custom headers. Normally this would cost you but thanks to the [Open Source plan](https://www.netlify.com/blog/2016/07/28/netlifys-pro-plan-now-free-for-open-source-projects/), you can enjoy all this goodness for free. The setup is a breeze, it's basically just selecting your repository, setting the right build command and you're up and running. If you want to tweak the headers, all you need to do is add a file called `_headers` to your site's root. In Jekyll's case, that would be the `_site` folder. As that one is created at build time, I added that file to the repository root and make Jekyll include it when I'm building the site by modifying the `_config.yml` file.

    include:
      - _headers

But, Netlify has one other advantage. It deploys each branch to its specific environment which allows you to preview the changes before merging to master. As I'm adding headers that restrict access to files other than the site's origin together with specifically allowed locations, this means my pages will look a bit CSS-less when deployed to a domain other than `herebedragons.io`. To remedy this, I added a file called [`netlify.toml`](https://github.com/JanDeDobbeleer/blog/commit/f396b0db953efb01150fe75e1042337368f8803d#diff-5db06fd2327543bbb72119cd1e5761cf) with custom build logic that only copies the `_headers` file to the site's root when in "production" (master branch). For every other branch, it will use the `jekyll build` command which allows for working previews. This way I can write a post and immediately preview it before going live. **How insanely cool is that**?

We are about to enter 2017 and somehow it still feels as if my personal projects can do **a lot more** than most professional ones out there. People seem to have a fetish for struggling when it comes to creating and deploying software. But it shouldn't be that way. Have a look at that wonderful world out there and be amazed at how much easier your life can get if you'd just **take the time to learn something new**.
