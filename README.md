# Local Partner Connect
The _Local Partner Connect_ (LPC) is a javascript client that interfaces with Balihoo's local data API (https://github.com/balihoo/local-connect-client).

## Contents
* [Overview](#overview)
* [Requirements](#requirements)
* [Installation](#installation)
* [Local Testing](#local-testing)

## Overview
The LPC is available to use _as is_ or to use as a reference application for your own development purposes. It is intended to be used with the Balihoo _Local Marketing Cloud_, specifically the local data API.

Please note, this document assumes a successful response returned via the [Local Connect Client API](https://github.com/balihoo/local-connect-client#initial-setup):
```js
{clientId: xxxxxxxxx, clientApiKey: xxxxxxxxx}
```

Review the the [Local Connect Client API](https://github.com/balihoo/local-connect-client#initial-setup) documentation before continuing.

## Requirements
This document assumes you are familiar and comfortable with package managers, task runners, the CLI, and Apache. Your user must have sufficient privileges to install/run the dependencies in a location available to this project.

The LPC uses package mangers to maintain all of the application dependencies. NPM for Node (e.g. grunt) and Bower for the front-end (e.g. Angular). Ruby, SASS and Yeoman are also required for development.

Finally, you'll need to run a local Apache server for `localhost` development. [MAMP](http://mamp.info)/LAMP/WAMP makes this really easy or you can spin one up from the CLI using `apachectlapachectl`.

**For your reading pleasure:**

* Ruby: https://www.ruby-lang.org/en/
* Node/NPM: https://nodejs.org
* Bower: http://bower.io
* Grunt: http://gruntjs.com
* Yeoman: http://yeoman.io
* SASS: http://sass-lang.com

## Installation
From the CLI, at the root of this project, run  `npm install` or `sudo npm install` if you have permission errors. If you continue to have errors, be sure you have install all of the [Requirements](#requirements).

## Local Testing
This app includes an `authService` for convenience of local testing. Open `./app/scripts/app.js` and modify the following `var` to include the localhost port number (if necessary) the local path from the Apache root.

```js
var url = 'http://localhost[:XXXX]/[PATH]/app/scripts/libraries/clientAuth.php';
```

**Serve up the application** - From the CLI, at the root of this project, run `grunt serve`

**Run the application** - Change your local app URL query string to include the `apiKey` you received from your Balihoo representative.
```html
http://localhost[:XXXX]/#/?brandKey=[example]&locationKey=[XXXX]&userId=[example]&groupId=[example]&test=1&apiKey=[XXXX]
```

## Distributed Application
**Content Delivery Network (CDN)** - The application is hosted through Balihoo's content delivery network (CDN). The location of the application is located at the following address:
```html
http://cdn.balihoohosting.com/local-partner-connect/v1.1/#/
```

**Using the application in an `<iframe>`** - The application can be used in an `<iframe>` in situations such as embeding into an existing intranet. Utilizing the CDN listed above, the mark up for an `<iframe>` is as follows:
```html
<iframe src="http://cdn.balihoohosting.com/local-partner-connect/v1.1/#/?clientId=[XXXX]&clientApiKey=[XXXX]"></iframe>
```