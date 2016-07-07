import Ember from 'ember';
import Config from './../configuration';
import { ActiveModelSerializer } from 'active-model-adapter';
import RESTSerializer from 'ember-data/serializers/rest';

const { consumerApp } = Config;

const sharedMixin = Ember.Mixin.create({
  normalize(modelClass, resourceHash, prop) {
    // either the jsonapi attributes, or just the json object from rails
    return this._super(modelClass, resourceHash.attributes || resourceHash, prop);
  }
});

const restMixin = Ember.Mixin.create({
  payloadKeyFromModelName(modelName) {
    return Ember.String.underscore(modelName);
  },
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  }
});

let appMixin = [ sharedMixin ];
let appSerializer = ActiveModelSerializer;
if (consumerApp) {
  appSerializer = RESTSerializer;
  appMixin.push(restMixin);
}
export default appSerializer.extend(...appMixin);
