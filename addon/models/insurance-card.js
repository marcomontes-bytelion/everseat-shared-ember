import ApplicationModel from './application';
import DS from 'ember-data';
import Ember from 'ember';

export default ApplicationModel.extend({
  card_type: DS.attr('string'),
  patient_record_id: DS.attr('number'),
  user_id: DS.attr('number'),
  photo: DS.attr('raw'),
  photo_file_name: DS.attr('string'),
  photo_thumb: DS.attr('string'),
  photo_url: DS.attr('string'),
  payer: DS.attr('string'),
  member_id: DS.attr('string'),
  group_id: DS.attr('string'),


  photoUrl: Ember.computed('photo_url', 'photo', function() {
    return this.get('photo.data') || this.get('photo_url') || this.get('photo_thumb') || '' ;
  })

});
