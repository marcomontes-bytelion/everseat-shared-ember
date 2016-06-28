import Ember from 'ember';

export default Ember.Service.extend({

  store: Ember.inject.service('store'),

  getPayers() {
    return this.get('store').findAll('insurance-payer');
  },

  findPayer(pokitdokId) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.getPayers().then((payers) => {
        return resolve(payers.find((p) => {
          return p.get('pokitdok_id') === pokitdokId;
        }));
      }, (reason) => {
        return reject(reason);
      });
    });
  }

});
