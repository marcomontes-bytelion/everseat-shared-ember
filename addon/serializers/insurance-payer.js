import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  payloadKeyFromModelName(modelName) {
    return Ember.String.underscore(modelName);
  },
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  }
});
