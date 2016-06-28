import DS from 'ember-data';

export default DS.Model.extend({
  pokitdok_id: DS.attr('string'),
  name: DS.attr('string')
});
