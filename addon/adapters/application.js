import Ember from 'ember';
import Config from './../configuration';
import { ActiveModelAdapter } from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Consumer-Application': Config.consumerApp
  },
  buildURL() {
    const s = this._super(...arguments);
    return `${s}.json`;
  }
});
