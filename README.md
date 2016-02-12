![Version](https://img.shields.io/npm/v/quick-config.svg) 
![License](https://img.shields.io/npm/l/quick-config.svg) 
![Downloads](https://img.shields.io/npm/dt/express.svg)

# quick-config
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
npm install quick-config --save
```

Require the module and then retrieve the configuration settings you want:
```javascript
var config = require('quick-config');
var widgetPath = config.get('WIDGET_PATH');
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
>>>>>>> Initial version
