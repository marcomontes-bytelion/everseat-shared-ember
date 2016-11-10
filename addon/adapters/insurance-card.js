import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  pathForType(modelName) {
    return Ember.String.pluralize(Ember.String.underscore(modelName));
  },

  urlForCreateRecord(modelName, snapshot) {
    const owner_id = snapshot.attr('patient_record_id');
    const owner_type = (owner_id) ? 'patient_records' : 'users';
    return `/${owner_type}/${owner_id}/insurance_cards`;
  },

  urlForDeleteRecord(id, modelName, snapshot) {
    const owner_id = snapshot.attr('patient_record_id');
    const owner_type = (owner_id) ? 'patient_records' : 'users';
    return `/${owner_type}/${owner_id}/insurance_cards/${id}`;
  },

  urlForUpdateRecord(id, modelName, snapshot) {
    const owner_id = snapshot.attr('patient_record_id');
    const owner_type = (owner_id) ? 'patient_records' : 'users';
    return `/${owner_type}/${owner_id}/insurance_cards/${id}`;
  }
});
