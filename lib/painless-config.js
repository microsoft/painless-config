var fs = require('fs');
var process = require('process');
var walkBack = require('walk-back');
var objectPath = require('object-path');

(function () {
  var config = {};
  
  var fallbacks = undefined;
  var fallbackLocation = undefined;

  function findFallbacks() {
    if (fallbackLocation !== undefined) {
      return;
    }
    
    fallbackLocation = walkBack(process.cwd(), 'env.json');
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
    fallbacks = JSON.parse(fallbackData);
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
    for (var env in fallbacks) {
      var envPath = getEnvPath(env);
      if (objectPath.get(all, envPath) === undefined) {
        objectPath.set(all, envPath, fallbacks[env]);
      }
    }
    return all;
  };
  
  module.exports = config;
})();