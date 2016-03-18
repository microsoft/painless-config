![Version](https://img.shields.io/npm/v/painless-config.svg)
![License](https://img.shields.io/github/license/Microsoft/painless-config.svg)
![Downloads](https://img.shields.io/npm/dt/painless-config.svg)

# painless-config
Low friction library for application configuration.

# Why another configuration library?
There were 14 configuration libraries so we needed to build one to unify them
all, there are now 15 configuration libraries.

![XKCD Comic](http://imgs.xkcd.com/comics/standards.png)

In all seriousness, we were looking for a configuration library that had the
following traits:

1. Has a low barrier to entry and is simple
1. Primarily uses environment variables (usually for production)
1. Could fallback to a file (usually for local development)
1. High performance (especially when using environment variables)

# Usage
Add a dependency to the npm package:
```bash
npm install painless-config --save
```

Require the module and then retrieve the configuration settings you want:
```javascript
var config = require('painless-config');
var widgetPath = config.get('WIDGET_PATH');
```

You can also retrieve all settings as a complex object:
```javascript
var allSettings = config.all();
```

Any - or _ in the environment variable's name will be used to create the
object's structure. For example, given these environment variables:
```bash
RECT_WIDTH=16
RECT_HEIGHT=9
```

This object would be returned:
```javascript
{
  "RECT": {
    "WIDTH": 16,
    "HEIGHT": 9
  }
}
```

# Resolution order
Configuration settings will be resolved in this order:

1. Environment variable
1. Closest ancestor env.json to the working directory
1. Return undefined

# Fallback
If an environment variable cannot be found then the library will begin walking
up the tree from the current working directory until it finds an env.json file.

The env.json must have the following structure:
```javascript
{
  "setting1": "value1",
  "setting2": "value2"
}
```

# Contributing
Pull requests that honor the traits above will gladly be considered!