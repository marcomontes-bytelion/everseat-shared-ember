import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  urlForCreateRecord(modelName, snapshot) {
    return `/users/${snapshot.attr('user_id')}/insurance_cards`;
  },

  urlForDeleteRecord(id, modelName, snapshot) {
    return `/users/${snapshot.attr('user_id')}/insurance_cards/${id}`;
  },

  urlForUpdateRecord(id, modelName, snapshot) {
    return `/users/${snapshot.attr('user_id')}/insurance_cards/${id}`;
  }
});
