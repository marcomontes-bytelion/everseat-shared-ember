import AppSerializer from './application';
import omit from 'lodash/omit';

export default AppSerializer.extend({
  serialize(snapshot) {
    let json = this._super(...arguments);
    if (json.photo && json.photo.data) {
      json.photo = json.photo.data;
    }
    const deleted = snapshot.record.get('_destroy');
    if (deleted) {
      json._destroy = deleted;
    }
    if (json.patient_record) {
      json.patient_record_id = json.patient_record;
      json = omit(json, ['patient_record']);
    }
    return json;
  }
});
