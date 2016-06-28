import { moduleForModel, test } from 'ember-qunit';

moduleForModel('insurance-card', 'Unit | Model | insurance card', {
  // Specify the other units that are required for this test.
  needs: [
    'transform:raw'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
