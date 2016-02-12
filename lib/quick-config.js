var fs = require('fs');
var process = require('process');
var walkBack = require('walk-back');

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

  config.get = function (variable) {
    var value = process.env[variable];
    if (value === undefined) {
      loadFallbacks();
      value = fallbacks[variable];
    }
    return value;
  };
  
  module.exports = config;
})();