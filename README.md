# artisoks

Simple website for my sister's art project. Made with React.

Requirements:
* [Node.js](https://nodejs.org/en/)
* [Bower](http://bower.io/)
* [Gulp](http://gulpjs.com/)

## Setup

Clone the repo with git:
```
git clone git@github.com:sjaakluthart/artisoks.git
```

### Installation

Install the node modules:
```
npm install
```

Install the bower components:
```
bower install
```

Create secret files used by gulp in the root directory of the project.

*settings.json*
```
{
    "host": "MY.FTP.HOST",
    "user": "MY.FTP.ACCOUNT",
    "pass": "MYPASSWORD",
    "remotePath": "MY/REMOTE/PATH"
}
```

*secrets.js*
```
secrets = {
    key: 'MY_API_KEY',
    userId: 'MY_USER_ID',
    analytics: 'MY_ANALYTICS_ID'
}
```

Generate the assets file *bower_components.js*:
```
gulp bower
```

Generate the build file *app.min.js*:
```
gulp build
```

### Running

To view the website run:
```
node app.js
```

Your terminal should return something like:
```
App listening at http://:::3000
```
