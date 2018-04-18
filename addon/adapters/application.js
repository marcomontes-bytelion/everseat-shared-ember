import Ember from 'ember';
import Config from './../configuration';
import { ActiveModelAdapter } from 'active-model-adapter';
import RESTAdapter from 'ember-data/adapters/rest';
import keys from 'lodash/keys';

const sharedMixin = Ember.Mixin.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Consumer-Application': Config.consumerApp
  },
  buildURL() {
    const s = this._super(...arguments);
    return `${s}.json`;
  },
  _isServerError(status = '') {
    const cmp = `${status}`;
    const regexp = /^5/;
    return cmp.match(regexp) !== null;
  }
});

const restMixin = Ember.Mixin.create({
  trackjs: Ember.inject.service(),
  i18n: Ember.inject.service(),
  headers: Ember.computed(function() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': Ember.$.cookie('XSRF-TOKEN')
    };
  }).volatile(),
  handleResponse(status, headers, payload, requestData) {
    let processed = payload;
    if (processed && !this.isSuccess(status, headers, processed)) {
      let errors = [];
      if (!Ember.isArray(processed.errors || [])) {
        keys(processed.errors).forEach((key) => {
          errors.push({
            status: status,
            title: processed.errors[key],
            detail: processed.errors[key],
            source: {
              pointer: `/data/attributes/${key}`
            }
          });
        });
        processed.errors = errors;
      } else if (typeof processed === 'string') {
        const title =   (processed.length < 256) ? processed : this.get('i18n').t('errors.general.title');
        const detailedInformation = this._isServerError(status) ? this.get('i18n').t('errors.status500') : processed;
        processed = {
          errors: [{
            status: status,
            title: title,
            detail: detailedInformation,
            source: {
              pointer: '/data/attributes/general'
            }
          }]
        };
      }
      // Adding additional error handling information
      const trackjs = this.get('trackjs');
      if (trackjs && status === 422) {
        const requestHeaders = this.get('headers');
        trackjs.track([status,requestData, processed.errors, headers, requestHeaders]);
      }
    }
    return this._super(status, headers, processed, requestData);
  }
});

let appMixin = [sharedMixin];
let appAdapter = ActiveModelAdapter;
if (Config.consumerApp) {
  appAdapter = RESTAdapter;
  appMixin.push( restMixin );
}
export default appAdapter.extend(...appMixin);
