import Ember from 'ember';

const { getWithDefault } = Ember;

// These are the default configuration settings merged into the ember app,
// and can be overriden in the config/environment.js file.
//
// module exports = function(environment) {
//   var ENV = {
//     ...
//     everseat {
//       /* see the DEFAULTS for options */
//     },
//   }
//   return ENV;
// }
const DEFAULTS = {
  consumerApp: true,
  cookieDomain: '.everseat.com',
  appRootURL: '//dashboard.everseat.com',
  location: {
    through_browser: true,
    defaultSettings: {
      range: 100,
      latlng: { /* Baltimore, MD */
        lat: 39.3231496,
        lng: -76.63119569999999
      },
      city_state: {
        city: 'Baltimore',
        state: 'MD'
      },
      description: 'Baltimore, MD'
    }
  }
};

export default {

  consumerApp: DEFAULTS.consumerApp,

  cookieDomain: DEFAULTS.cookieDomain,

  appRootURL: DEFAULTS.appRootURL,

  location: DEFAULTS.location,

  load(config) {
    for (let property in this) {
      if (this.hasOwnProperty(property) && Ember.typeOf(this[property]) !== 'function') {
        this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
};
