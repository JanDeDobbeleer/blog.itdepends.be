---
date: 2017-06-13T00:00:00Z
description: Mostly when we talk about devops, the context is code and applications.
  But what about documentation?
tags:
- git
- cli
- tool
- tooling
- open source
- version control
- vsts
- github
- travis
- circleci
- docker
- testing
- ci
- continuous integration
- build
- docs
- technical documentation
- analysis
- sequence diagram
- plantuml
- graphviz
- swagger
- node
- npm
- javascript
title: DocOps Part I - No time to rest
url: /docops-part-1
---

Recently, I got the chance to assist a team of frontend and back-end developers to do a bit of open heart surgery. The scope of the project is as follows, migrate a BBOM monolith towards a new BSS system but keep the frontend part, and convert another web frontend and one mobile app to the same BSS system. To facilitate this, and because it's common sense, the decision was made to create our own REST API in between. But, **we were faced with an issue**. Time is limited and we wanted to start creating everything at once. Without a working API implementation and the need for a defined interface, we decided to look for a tool to assist us in this process.

## Gotta have swag

We began to create our API using <a href="https://apiblueprint.org/" target="_blank">API Blueprint</a> in <a href="https://apiary.io/" target="_blank">Apiary</a>, but that soon turned out to be quite annoying because of a few reasons. One, everything exists within the same file. This implies the file grows quite large once you start adding endpoints, examples and responses. Secondly, **there's no nice way to start working on this as a team**, unless you get a Standard Plan. We could debate about whether or not migrating to another plan would have solved our problem, but let's be honest, I'd rather invest in the team than spend it on unnecessary tooling.

I began a venture to migrate this to another tool, and eventually ended up playing with <a href="http://swagger.io/" target="_blank">Swagger</a>. First off, Swagger also supports yaml, which is a great way to describe these things. Secondly, **the ecosystem is a bit more mature** which allows us to do things API Blueprint does not provide, such as split the specification into smaller parts. I found this great <a href="http://azimi.me/2015/07/16/split-swagger-into-smaller-files.html" target="_blank">blog post</a> by Mohsen Azimi which explains exactly this, and following his example, I added a <a href="https://github.com/JanDeDobbeleer/docops-template-api/blob/9de906bd9e991a1610ba2a024ea15c1325e49f0b/api/compile.js" target="_blank">compile.js</a> file that collects the `.yaml` references and combines those into one big `swagger.json` file.

The advantages are interesting as we can now split the Swagger specification into folders for context and work on different parts without creating needless overhead all the time, like merge conflicts for example. To make sure we know the changes comply with the Swagger definition, I added a check after compiling `swagger.json` using <a href="https://github.com/BigstickCarpet/swagger-parser" target="_blank">swagger-parser</a> to validate the output. Combined with a docker container to do the compilation and validation, we've got ourself a nice way to proceed with certainty. Adding this to a CI is peanuts, as we can use the same docker image to run all the necessary checks. The project is currently being built using <a href="https://travis-ci.org/JanJoris/docops-template" target="_blank">Travis</a>, you can find a sample `.travis.yml` file in the <a href="https://github.com/JanDeDobbeleer/docops-template-api/blob/master/.travis.yml" target="_blank">repository</a>.

The setup of the project is as follows. The explanation of the components is listed inline, be aware I only listed the parts which need an explanation. Refer to the <a href="https://github.com/JanDeDobbeleer/docops-template-api" target="_blank">repository</a> for a complete overview.

```
.
├── definitions // the data model used by the API
|   ├── model.yaml // model definition
|   └── index.yaml // list of model definitions
├── examples // sample json output
|   ├── sample.json
|   └── second_sample.json
├── parameters
|   ├── index.yaml // header and query string parameters
├── paths
|   ├── path.yaml // path definition
|   └── index.yaml / list of path definitions
├── swagger-ui // folder containing custom Swagger-UI
├── gulpfile.js // build and development logic
├── makefile // quick access to commands
└── swagger.yaml // swagger spec base file
```

While this sample contains model, path and parameter definitions in the root of each sub folder, nothing stops you from creating more folders to structure the definitions inside. As the <a href="https://github.com/JanDeDobbeleer/docops-template-api/blob/master/gulpfile.js#L31" target="_blank">compile function</a> in `gulpfile.js` (previously `compile.js`) takes care of stitching the YAML files into one JSON spec, it can be as flexible as you want. The `makefile` contains a few handy commands so everyone can use the project without the need for specific setup or docker knowledge.

To change the spec you can use any editor of choice, I have Visual Studio Code setup together with the <a href="https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer" target="_blank">Swagger Viewer plugin</a>. This way I can work on the spec and have it preview in a tab next to me. In case I need to validate the changes, I can also use the pre-configured `validate` task to quickly get feedback in my editor console. The tasks are added to the project to get you started using Visual Studio Code. If you do, make sure to also add a key binding to spawn the tasks. Open `keybindings.json` and enter the following (change the key combo if needed).

```
    {
        "key": "ctrl+shift+r",
        "command": "workbench.action.tasks.runTask"
    }
```

On top of that, one of my colleagues, Joeri Hendrickx, extended the setup by creating a <a href="https://github.com/JanDeDobbeleer/docops-template-api/blob/master/gulpfile.js#L13" target="_blank">watch function</a> inside the `gulpfile.js` file that automatically reloads changes in Swagger-UI while you adjust files. This way, there's no need for a specific setup and you can use any editor you like. As an extra bonus, it will also display the errors on top of the page.

To run the swagger specification, use the `make swagger` command or the `swagger` task in Visual Studio Code. By default, Swagger UI will be available at `localhost:3000`, unless you specify another port using the `SWAGGER_PORT` environment variable. To enable the watch function, make use of the `make watch` command or `watch` task in Visual Studio Code.

## Are you mocking me?

This leaves us with one open item. How do we create a mock service using our Swagger specification? As it turns out, there's a very useful tool out there called <a href="https://stoplight.io/platform/prism/" target="_blank">Prism</a> that does just that. Part of the Stoplight tool set, their CLI tool allows you to create a mock server by simply using a Swagger spec. This provides you with all you need to design, test and move fast.

The docker image has been extended to also pull in the latest version of Prism and add it to our path. You can run the mock server through the `make mock` command or the `mock` task in Visual Studio Code. By default, the mock server will run on `localhost:8010`, unless you specify another port using the `PRISM_PORT` environment variable.

Starting the mock server prints the available endpoints. You now have the ability to start developing and use the mocked API, or validate your work via <a href="https://www.getpostman.com/" target="_blank">Postman</a>, curl or any http request tool of choice. Using this repository, the curl following command will output a mocked result.

    curl -X GET http://localhost:8010/v1/ping -H 'authorization: Basic trololol'

If for any reason you need to debug inside the container, you can use the `make interactive` command. This will open a shell inside the container for you to mess around in. I never needed it until now, but it's there. Just in case.

The setup we have at work currently uses <a href="https://jenkins.io/" target="_blank">Jenkins</a> to validate the spec which is deployed to <a href="https://dashboard.heroku.com/login" target="_blank">Heroku</a> every time the build on master succeeds (which is, well, every time). This way we have a single place of truth when it comes to our Swagger specification and accompanying mock service for developers or partners to play with. We can prototype fast while collecting feedback, or change current implementations fast and knowing the impact. **Our production API is tested against the Swagger specification**, which is integrated in that repository as a submodule to decouple designing and implementation. To get a more behavioral representation of a real API, we created middleware in Python which can keep track of the data you send and respond accordingly for certain processes. Changes to this part are also validated against the specification in order to reduce the chance of creating errors.

Feel free to mess around, ask questions or even create issues and pull requests on GitHub and let me know what you think. And stay tuned for Part II which covers technical documentation!

<a class="github_link" href="https://github.com/JanDeDobbeleer/docops-template-api" target="_blank" >Source code</a>
