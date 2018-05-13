---
date: 2017-08-17T00:00:00Z
description: What if you can't find the code validation tool you're looking for? Create
  your own!
tags:
- github
- ci
- pull request
- review
- automation
- nodejs
- api
- validate
- cd
- merge
- git
- express
- octonode
title: None shall pass
url: /none-shall-pass
---

I hope by now we all **integrate with third party tooling** when it comes to validating code changes and enforcing conventions and good practice. But what do you do when you can't find what you're looking for? That's exactly where I was when one of my team members asked if it's possible to block merging pull requests in GitHub when there are still fixup or squash commits to be found (this all boils down to our branching strategy, more on that in a future blog post).

We want to proceed with safety, which means no-one should have to worry about merging something which isn't ready. People have to be able to **focus on being awesome** and everything in the development process should facilitate that. When we build gated check ins, we want to cover everything we can, leaving no room for mistakes. As we all fail at times, we have to automate wherever we can.

Luckily for us, GitHub provides a rich API that allows to interact with basically everything. Creating an automated review tool starts by setting up a small API where GitHub can post events to. Now, I've tried numerous languages and frameworks, and when it comes to quickly creating a web API, I always go to <a href="https://expressjs.com/" target="_blank">Express</a> in nodejs. You can **hate on Javascript** all you want, but even in a swamp there are flowers to be found.

Thanks to an active community, we can make use of two modules to help us out. <a href="https://github.com/alexcurtis/express-x-hub" target="_blank">express-x-hub</a> to assist in validate requests, and <a href="https://github.com/pksunkara/octonode" target="_blank">octonode</a> to interact with the GitHub API. We start out simple by creating an endpoint to integrate with GitHub and test the API. I created a <a href="https://gist.github.com/JanJoris/71180e7346573e2313480adf817f6107" target="_blank">gist</a> that contains all the code needed to follow along. Let's go over the files and their responsibilities.

As we're dealing with a nodejs project, we've got our obligatory `package.json` file containing the project description and dependencies. I prefer <a href="https://yarnpkg.com/en/" target="_blank">yarn</a> over npm, so let's meet these dependencies using `yarn install` to download and install these locally. There are two other files to be found, `app.js` contains the logic to run our express API and `.env` holds the environment variables we do not wish to expose in the source code (you want to add this to your `.gitignore` file). For your enjoyment, I also included the `launch.json` debug settings for Visual Studio Code.

Verify if you can run everything locally before connecting this to the web. Open the project in Visual Studio Code, open `app.js` and press `F5`. Great, you've got a little API running in debug mode. Navigating to `localhost:3000` should display a _hello world_ in your browser (rejoice). Of course, we aren't interacting with GitHub yet. Thanks to the marvels of today's development tools, we can use <a href="<https://ngrok.com/>
" target="_blank">ngrok</a> to expose the API running on our machine. Install `ngrok`, and expose the API running on port `3000` using `ngrok http 3000` in your preferred shell environment.

Next up, we have to create a webhook in the GitHub repository you wish to interact with. Go to _Settings/Webhooks/Add webhook_ to create a new one. Enter `https://<GUID>.ngrok.io/github-hook` using the specific endpoint `ngrok` provided you with, just make sure to use https. Set _Content type_ to `application/json` and enter a random secret (save this value for later). Enable _Let me select individual events_, select `Pull request` and remove the `Push` event. Pressing _Add webhook_ immediately triggers a POST to our newly created API which should then print the received data. You can see the data GitHub sends by opening a webhook's details and scroll to the bottom. There's a section _Recent Deliveries_ that contains the payloads and response data. For our newly received request, you should see a response status 200 and the same payload printed by the API running on our machine.

To talk to GitHub, we will use a personal access token. Whether you're setting this up for a personal repository or not, you might want to go for a token from a bot or regular user. On GitHub, navigate to _Your personal settings/Personal access tokens/Generate new token_, add a description and select the high level `repo` scope. Generate the token and copy the key. Go back to the project in Visual Studio Code and edit the `.env` file using your newly generated token and the previously generated secret when setting up the webhook (you can always edit the hook in case you forgot this).

    XHUB_SECRET=your_secret
    GITHUB_API_KEY=your_personal_access_token

There's one file in the code sample we didn't cover yet. `github.js` contains a function using `octonode` to interact with GitHub and set a commit status. We will use this to set a status on the last commit in a pull request. Change the `app.post('/github-hook', function(req, res)` function in `app.js` to look like this and restart the API using `F5`.

    app.post('/github-hook', function(req, res) {
        var isValid = req.isXHubValid();
        if (!isValid) {
            res.status(404).end();
            return;
        }
        res.status(200).end();
        github.setCommitStatus(req.body.pull_request.head.repo.full_name,
            req.body.pull_request.head.sha,
            'failure',
            'Oh no, this commit looks bad!',
            'github-tools/test');
    });

Let's have a look at this function. First, the secret you selected when setting up the webhook serves as validation for the request. This to make sure the received request is indeed coming from our repository. If it can't validate the request, we'll simply return a 404 because **we're not really here**. Once the request passes validation, we immediately return a 200 as the processing of the pull request might take longer than the time it takes GitHub to mark the request as timeout. Finally, we set a hardcoded commit status on the HEAD of the pull request.

GitHub provides 4 types of commit statuses: pending, success, error, or failure. Depending on your use-case, you might want to mark commits `pending` before assigning the final status. And make sure to only mark them as `error` when your API code failed to validate due to a bug.

Now, when you push a branch in the repository you added the webhook to and create a pull request, you will see the data being posted to your API. If you did everything according to the sample, the API will immediately mark the commit as `failure` and GitHub will display the message `Oh no, this commit looks bad!`. The cool thing is, now you can **mark this check as required** in the repository's settings to enforce the rule and not allow anyone to bypass this check. Navigate to _Branches/Protected branches/\<branch\>/edit/Require status checks to pass before merging/\<select github-tools/test\>_.

Using this sample, you can extend it towards whatever use-cases your team could benefit from. You can find the implementation our team currently uses in my <a href="<https://github.com/JanJoris/github-tools>
" target="_blank">github-tools</a> repository. We currently have 2 use-cases, one is to check for any fixup or squash commits in the pull requests, the other one will look for changes in `requirements.txt` files and make sure everyone neatly follows <a href="<https://www.python.org/dev/peps/pep-0440/>
" target="_blank">PEP440</a> rules and properly sets dependencies. As the possibilities are endless, I can't wait to see what you'll come up with, so make sure to let me know in the comments or on <a href="<https://twitter.com/jan_joris>
" target="_blank">Twitter</a>!




