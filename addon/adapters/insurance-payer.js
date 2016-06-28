import ApplicationAdapter from './application';

const InsurancePayerMixin = Ember.Mixin.create({
  pathForType(modelName) {
    return 'insurance_partners';
  }
});

export default ApplicationAdapter.extend(InsurancePayerMixin, {
});
export { InsurancePayerMixin };
