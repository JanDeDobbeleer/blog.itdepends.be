---
date: 2018-03-29T00:00:00Z
description: Debugging http requests being made by you application running inside
  a container can be tricky. But it shouldn't be.
tags:
- docker
- api
- validate
- python
- mitmproxy
- container
- http
- https
- ssl
- decrypt
- certificate
- root
- certifi
- requests
- debian
- jessie
- django
title: Intercept HTTP traffic exiting a docker container
url: /intercept-docker-traffic
---

Imagine the following problem. You are working on an application running inside a docker container and you feel the need to inspect the http requests being executed by your application. Coming from an app development background myself, it can be a huge benefit to use proxy tooling like <a href="https://mitmproxy.org/" target="_blank">mitmproxy</a> to see the actual request being made instead of staying stuck trying to figure out what's wrong. Or, use the proxy to alter requests and easily test use cases or reproduce bug reports. All in all, there's a significant gain in lead time when using the right tool for the job. Otherwise **we'd still be adding print statements everywhere** just for the sake of debugging (I know you're doing it).

In this case, I have a Python Django web app running in a Debian Jessie container and I needed to see the flow of requests being made towards the backend REST API. Installing mitmproxy is a breeze, as it's a cross platform tool, you can follow the installation guide for your platform. I'm running it using the WSL on Windows myself (Ubuntu). Before doing anything else, start mitmproxy and get comfortable. The default port for capturing traffic is 8080, change it using the `-p <portnumber>` option in case conflicts would occur.

```bash
$ mitmproxy
```

Docker provides proxy support out of the box which is convenient.
As we've got mitmproxy running on our host machine, we want to route all traffic exiting the container to that once. To do so, I created a new docker-compose.override file which holds all settings and (almost all) logic.

```YAML
version: '2'
services:
  mv-web:
    environment:
      - HTTP_PROXY=mitmproxy:8080
      - HTTPS_PROXY=mitmproxy:8080
    extra_hosts:
      - "mitmproxy:10.125.2.187"
    command: sh -c 'python3 certificate.py && python3 manage.py runserver 0.0.0.0:8020'
```

In the above example I only added the settings relevant to illustrate the solution. You can see two environment variables, `HTTP_PROXY` and `HTTPS_PROXY`. These tell the container to route all exiting traffic towards mitmproxy, who's added as an extra host. The ip address `10.125.2.187` is the one of my host machine, change it to whatever yours is.

Now, you might notice there's another little item in there called `python3 certificate.py` which runs just before we start the Django app. If you'd only use the proxy settings, http requests would enter mitmproxy just fine, but https requests will not show up. The reason is that mitmproxy uses it's own certificate to be able to decrypt the traffic flowing through. As a result, the requests will get blocked as the OS doesn't trust that certificate (like it should).

Initially I tried to add the certificate to the container's OS trusted certificate store, but that didn't work out as planned. I could run a `curl` command inside the container to an https endpoint and **it flowed through mitmproxy like a boss**, but when I started the Django app, https requests kept being aborted. It took me a while to figure out what was going on. Our Django app uses the <a href="http://docs.python-requests.org/en/master/" target="_blank">Requests</a> library to execute http calls. This one in turn uses <a href="https://github.com/certifi/python-certifi">certifi</a> to create its trusted certificate store, which didn't have a copy of mitmproxy's root certificate causing all https calls being silenced and not exiting the container.

The solution, once you know it, is straightforward. Add a script called `certificate.py` to your container (either by volume mapping, or as a build step) together with mitmproxy's root certificate (located at `~/.mitmproxy/mitmproxy-ca-cert.pem`) and edit the `docker-compose.override.yml` file to execute `certificate.py` before starting the Django app.

Copy mitmproxy's root certificate to your Django app's root folder:

```bash
$ cp ~/.mitmproxy/mitmproxy-ca-cert.pem <project root>
```

Create a new file called `certificate.py` in the same project root:

```python
import certifi

caroot = certifi.where()
with open('mitmproxy-ca-cert.pem', 'rb') as mitm:
    cert = mitm.read()
with open(caroot, 'ab') as out:
    out.write(cert)
print('w00t, added mitmproxy root cert to certifi!')
```

Now, when you up the docker container with compose, you'll see all traffic flowing through mitmproxy! Happy debugging!

## Small additions

### Multiple docker-compose files

When using a `docker-compose.override.yml` file and you've already specified another non-standard `docker-compose` file, make sure to use `-f` twice to load both (or more) settings files. So, imagine your settings file is called `docker-compose.standalone.yml` and you've added all files following this tutorial, the command to up your container becomes:

```shell
docker-compose -f .\docker-compose.standalone.yml -f .\docker-compose.override.yml up
```

Our override file should be last so that no setting can be overwritten by settings in previous files, The last in wins.

### Check firewall settings

As I'm running this on Windows, I still had to open up port `8080` to allow the container to connect to mitmproxy. Double check on whatever system you're using that this isn't the thing causing a headache before proceeding 😑.

### But I'm not using Python or Requests

In case you want to do this but don't have a Python app using Requests, you can try to add the certificate to the container's OS as I mentioned before. For some reason, I also had to set it on every container start, but that's not too much hassle. Instead of `certificate.py`, create a file called `certificate.sh` with the following content:

```shell
mkdir /usr/local/share/ca-certificates/extra
cp mitmproxy-ca-cert.pem /usr/local/share/ca-certificates/extra/root.cert.crt
update-ca-certificates
```

Then, change the `docker-compose.override.yml` file to execute this one instead of `certificate.py`:

```YAML
command: sh -c './certificate.sh && <whatever the command>'
```

The example assumes a Debian based container, make sure to alter `certificate.sh` to add the root certificate to the correct location according to your container's OS.

Have fun!
