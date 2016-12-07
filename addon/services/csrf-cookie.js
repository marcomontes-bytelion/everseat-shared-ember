import Ember from 'ember';

export default Ember.Service.extend({

  csrf: null,

  set(csrf) {
    this.csrf = csrf;
  },

  get() {
    return this.csrf;
  }

});
