/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

var fs = require('fs');
var process = require('process');
var walkBack = require('walk-back');
var objectPath = require('object-path');
var yaml = require('js-yaml');

(function () {
  var config = {};

  var fallbacks;
  var fallbackLocation;

  function findFallbacks() {
    if (fallbackLocation !== undefined) {
      return;
    }

    fallbackLocation = walkBack(process.cwd(), 'env.json') ||
                       walkBack(process.cwd(), 'env.yaml');
  }

  function loadFallbacks() {
    if (fallbacks !== undefined) {
      return;
    }

    findFallbacks();
    if (fallbackLocation === null) {
      fallbacks = {};
      return;
    }

    var fallbackData = fs.readFileSync(fallbackLocation, 'utf8');
    if (fallbackLocation.endsWith('.json')) {
      fallbacks = JSON.parse(fallbackData);
    } else {
      fallbacks = yaml.safeLoad(fallbackData);
    }
  }

  function getEnvPath(env) {
    return env.replace(/[_-]/g, '.');
  }

  config.get = function (variable) {
    var value = process.env[variable];
    if (value === undefined) {
      loadFallbacks();
      value = fallbacks[variable];
    }
    return value;
  };

  config.all = function () {
    loadFallbacks();
    var all = {};
    for (var env in process.env) {
      if (process.env.hasOwnProperty(env)) {
        var envPath = getEnvPath(env);
        objectPath.set(all, envPath, process.env[env]);
      }
    }
    for (var fallbackEnv in fallbacks) {
      var fallbackEnvPath = getEnvPath(fallbackEnv);
      if (objectPath.get(all, fallbackEnvPath) === undefined) {
        objectPath.set(all, fallbackEnvPath, fallbacks[fallbackEnv]);
      }
    }
    return all;
  };

  module.exports = config;
})();