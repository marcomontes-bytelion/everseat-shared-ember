import Ember from 'ember';
import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(serialized) {
    return Ember.isNone(serialized) ? {} : serialized;
  },

  serialize(deserialized) {
    return Ember.isNone(deserialized) ? {} : deserialized;
  }
});
