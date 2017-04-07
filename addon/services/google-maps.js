import Ember from 'ember';
/**
 * This service lazy load googleMap api.
 **/
export default Ember.Service.extend({

  scriptUrl: 'https://maps.googleapis.com/maps/api/js',
  isLoaded: Ember.computed.equal('state', 'loaded'),
  state: 'none',

  init() {
    this._super(...arguments);
    const config = Ember.getOwner(this).resolveRegistration('config:environment')['everseat'];
    this.set('apiKey', config.google_api_key);
  },

  normalizeUrl() {
    var url = this.get('scriptUrl');
    url += '?' + 'v=3';
    if (this.get('apiKey')) {
      url += '&key=' + this.get('apiKey');
    }
    return url;
  },

  loadScript() {
    if (window.google && window.google.maps) {
      // If manually loaded, just say googlemaps api is available
      return true;
    }
    if (this.get('state') !== 'none'){
      return false;
    }
    this.set('state', 'loading');
    window.loadGmap = Ember.run.bind(this, function () {
      this.set('state', 'loaded');
    });
    var url = this.normalizeUrl();
    return Ember.$.getScript(url, window.loadGmap).fail(function(){
      Ember.debug('GoogleMapsApi failed to load');
    });
  },

  asyncLoadScript() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const script = this.loadScript();
      if (script === true) {
        resolve(true);
      } else if (script === false) {
        resolve(false);
      } else {
        script.done(() => {
          resolve(true);
        }).fail(() => {
          reject(false);
        });
      }
    });
  }
});
