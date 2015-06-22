# Local Partner Connect
The _Local Partner Connect_ (LPC) is a javascript client that interfaces with Balihoo's local data API (https://github.com/balihoo/local-connect-client).

## Contents
* [Overview](#overview)
* [Requirements](#requirements)
* [Installation](#installation)
* [Local Testing](#local-testing)

## Overview
The Local Partner Connect is avilable to use _as is_ or to use as a reference application for your own development purposes. It is intended to be used with the Balihoo _Local Marketing Cloud_, specifically the local data API.

Please note, this document assumes a successful response returned via the [Local Connect Client API](https://github.com/balihoo/local-connect-client#initial-setup):
```js
{clientId: xxxxxxxxx, clientApiKey: xxxxxxxxx}
```

Review the the [Local Connect Client API](https://github.com/balihoo/local-connect-client#initial-setup) documentation before continuing.

## Requirements
This document assumes you are familiar and comfortable with package managers, task runners, the CL, Apache, your user has admin privileges, and you have installed/started the dependencies in a location available to this project. When in doubt, you can install these dependencies globally.

The LPC uses package mangers to maintain all of the application dependencies. NPM for Node (e.g. grunt) and Bower for the front-end (e.g. Angular). Although you can run the application locally without it, Yeoman is also required for development.

Finally you'll need to run a local Apache server for `localhost` development. [MAMP](http://mamp.info)/LAMP/WAMP makes this really easy or you can spin one up from the CLI using `apachectlapachectl`.

**For your reading pleasure:**

* Node/NPM: https://nodejs.org
* Bower: http://bower.io
* Grunt: http://gruntjs.com
* Yeoman: http://yeoman.io

## Installation
From the CLI, at the root of this project, run  `npm install` or `sudo npm install` if you have permission errors. If you continue to have error, be sure you have install all of the [Requirements](#requirements).

## Local Testing
This app includes an `authService` for convenience of local testing. Open `./app/scripts/app.js` and modify the following `var` to include the localhost port number (if necessary) the local path from the Apache root.

```js
var url = 'http://localhost[:XXXX]/[PATH]/app/scripts/libraries/clientAuth.php';
```

**Serve up the application**
From the CLI, at the root of this project, run `grunt serve`

**Run the apllication**
Change your local app URL query string to include the `apiKey` you received from your Balihoo rep.
```html
http://localhost[:XXXX]/#/?brandKey=[example]&locationKey=[XXXX]&userId=[example]&groupId=[example]&test=1&apiKey=[XXXX]
```