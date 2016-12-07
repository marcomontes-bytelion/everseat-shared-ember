import Ember from 'ember';
import Config from './../configuration';
import { ActiveModelAdapter } from 'active-model-adapter';
import RESTAdapter from 'ember-data/adapters/rest';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import lo from 'lodash/lodash';

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
  csrfCookie: Ember.inject.service(),
  trackjs: Ember.inject.service(),
  i18n: Ember.inject.service(),
  authorizer: 'authorizer:everseat',
  headers: Ember.computed(function() {
    const csrf = this.get('csrfCookie').get();
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf
    };
  }).volatile(),
  handleResponse(status, headers, payload, requestData) {
    if (headers['Ev-Xsrf-Token']) {
      this.get('csrfCookie').set(headers['Ev-Xsrf-Token']);
    }
    const trackjs = this.get('trackjs');
    let processed = payload;
    if (processed && !this.isSuccess(status, headers, processed)) {
      let errors = [];
      if (!Ember.isArray(processed.errors || [])) {
        lo.keys(processed.errors).forEach((key) => {
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
    }
    if (trackjs) {
      const requestHeaders = this.get('headers');
      trackjs.track([status, requestData, headers, requestHeaders]);
    }
    return this._super(status, headers, processed, requestData);
  }
});

let appMixin = [sharedMixin];
let appAdapter = ActiveModelAdapter;
if (Config.consumerApp) {
  appAdapter = RESTAdapter;
  appMixin.push( DataAdapterMixin, restMixin );
}
export default appAdapter.extend(...appMixin);
