---
date: 2017-04-25T00:00:00Z
description: Mastodon is the latest and greatest in distrubuted social networks. So,
  how do you manage your own instance?
tags:
- git
- cli
- tool
- tooling
- open source
- version control
- powershell
- github
- mastodon
- digital ocean
- ostatus
- gnu social
- twitter
- ubuntu
title: Running Mastodon
url: /running-mastodon
---

_Mastonaut's log, tootdate 10. We started out by travelling on board of <a href="https://mastodon.social" target="_blank">mastodon.social</a>. Being the largest one, we met with people from all over the fediverse. Some we could understand, others we couldn't. Those were interesting days, I encountered a lot of people fleeing from other places to feel free and be themselves, while **others were simply enjoying the ride**. It wasn't until we encountered the <a href="https://pawoo.net/about" target="_blank">Pawoo</a>, who turned out to have peculiar tastes when it comes to imagery, that the order in the fediverse got disturbed. But, as we can't expect to get freedom while restricting others', I fetched <a href="https://github.com/tootsuite/mastodon" target="_blank">the plans</a> to build my own instance. Ready to explore the fediverse and its inhabitants on my own, I set out on an exciting journey._

As I do not own a server myself, and still had $55 credit on <a href="https://m.do.co/c/fae55a8771b5" target="_blank">Digital Ocean</a>, I decided to setup a simple $5 Ubuntu 16.04 droplet to get started. This setup assumes you've got a domain name and I will even show you how to **run Mastodon on a subdomain while identifying on the root domain**. I suggest following the <a href="https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04" target="_blank">initial server setup</a> to make sure you get started the right way. Once you're all set, grab a refreshment and connect to your server through SSH.

Let's start by ensuring we have everything we need to proceed. There are a few dependencies to run Mastodon. We need docker to run the different applications and tools in containers (easiest approach) and nginx to expose the apps to the outside world. Luckily, <a href="https://m.do.co/c/fae55a8771b5" target="_blank">Digital Ocean</a> has an insane amount of up-to-date documentation we can use. Follow these two guides and report back.

* <a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04" target="_blank">Install docker</a>
* <a href="https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04" target="_blank">Install nginx</a>
* <a href="https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04" target="_blank">Install docker compose</a>
* <a href="https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04" target="_blank">Create 1GB swap space for extra memory muscle</a> (thx <a href="https://hartley.cc/@alex" target="_blank">Alex</a>!)

At this point, we're ready to grab the source code. Do this in your location of choice.

```shell
git clone https://github.com/tootsuite/mastodon.git
```

Change to that location and checkout the latest release (1.2.2 at the time of writing).

```shell
cd mastodon
git checkout 1.2.2
```

Now that we've got all this setup, we can build our containers. There's a useful <a href="https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Docker-Guide.md" target="_blank">guide</a> made by the Mastodon community I suggest you follow. Before we make this available to the outside world, we want to tweak our `.env.production` file to configure the instance. There are a few keys in there we need to adjust, and some we could adjust. In my case, **Mastodon runs as a single user instance**, meaning only one user is allowed in. Nobody can register and the home page redirects to that user's profile instead of the login page. Below are the settings I adjusted, remember I run Mastodon on a subdomain `mastodon.herebedragons.io`, but my user identifies as `@jan@herebedragons.io`. The config changes below illustrate that behavior. If you have no use for that, just leave the `WEB_DOMAIN` key commented out. If you do need it however, you'll still have to enter a redirect rule for your root domain that points `https://rootdomain/.well-known/host-meta` to `https://subdomain.rootdomain/.well-known/host-meta`. I added a rule on Cloudflare to achieve this, but any approach will do.

```shell
# Federation
LOCAL_DOMAIN=herebedragons.io
LOCAL_HTTPS=true

# Use this only if you need to run mastodon on a different domain than the one used for federation.
# Do not use this unless you know exactly what you are doing.
WEB_DOMAIN=mastodon.herebedragons.io

# Registrations
# Single user mode will disable registrations and redirect frontpage to the first profile
SINGLE_USER_MODE=true
```

As we can't run a site without configuring SSL, we'll use Let's Encrypt to secure nginx. Follow the brilliant guide over at <a href="https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04" target="_blank">Digital Ocean</a> and report back for the last part. Once setup, we need to configure nginx (and the DNS settings for your domain) to make Mastodon available for the world to enjoy. You can find my settings <a href="https://gist.github.com/JanDeDobbeleer/0b0a425e8639d980bc430ea22c14710c" target="_blank">here</a>. Just make sure to adjust the key file's name and DNS settings. As I redirect all `http` traffic to `https` using Cloudflare, I did not bother to add port `80` to the config, be sure to add it if needed.

Alright, we're ready to **start exploring the fediverse!** Make sure to restart nginx to apply the latest settings using `sudo service nginx restart` and update the containers to reflect your settings via `docker-compose up -d`. If all went according to plan, you should see your brand new shiny instance on your domain name. Create your first user and get ready to toot! In case you did not bother to add an smtp server, manually confirm your user:

```shell
docker-compose run --rm web rails mastodon:confirm_email USER_EMAIL=alice@alice.com
```

And make sure to give yourself ultimate admin powers to be able to configure your intance:

```shell
docker-compose run --rm web rails mastodon:make_admin USERNAME=alice
```

Updating is a straightforward process too. Fetch the latest changes from the remote, checkout the tag you want and update your containers:

```shell
docker-compose stop
docker-compose build
docker-compose run --rm web rails db:migrate
docker-compose run --rm web rails assets:precompile
docker-compose up -d
```

Happy tooting!
