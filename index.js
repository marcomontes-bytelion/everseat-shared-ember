/* jshint node: true */
'use strict';

// Refer https://ember-cli.com/extending/#advanced-customization for more documentation
module.exports = {
  name: 'everseat-shared-ember',
  isDevelopingAddon: function() {
    // Setting this to true will allow livereload when developing
    return true;
  },

  // called during the build process, this method helps us perform setup logic or
  // modify the app or addon
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included(target);

    //app.import(app.bowerDirectory + '/x-button/dist/js/x-button.js');
    //app.import(app.bowerDirectory + '/x-button/dist/css/x-button.css');
  }
};
