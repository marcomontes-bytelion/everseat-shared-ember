import ApplicationAdapter from './application';
import Ember from 'ember';

const InsurancePayerMixin = Ember.Mixin.create({
  pathForType() {
    return 'insurance_partners';
  }
});

export default ApplicationAdapter.extend(InsurancePayerMixin, {
});
export { InsurancePayerMixin };
