import ApplicationModel from './application';
import DS from 'ember-data';

export default ApplicationModel.extend({
  pokitdok_id: DS.attr('string'),
  name: DS.attr('string')
});
