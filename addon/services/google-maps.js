import Ember from 'ember';
/**
 * This service lazy loads googleMap api.
 **/
export default Ember.Service.extend({

  'api-key': null,
  isLoaded: Ember.computed.equal('state', 'loaded'),
  state: 'none',

  init() {
    this._super(...arguments);
    const config = Ember.getOwner(this).resolveRegistration('config:environment')['everseat'];
    this.set('api-key', config.google_api_key);
  },

  normalizeUrl() {
    return `https://maps.googleapis.com/maps/api/js?v=3&key=${this.get('api-key')}`;
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
    const url = this.normalizeUrl();
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
