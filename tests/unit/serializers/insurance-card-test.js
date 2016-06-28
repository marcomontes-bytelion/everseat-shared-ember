import { moduleForModel, test } from 'ember-qunit';

moduleForModel('insurance-card', 'Unit | Serializer | insurance card', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:insurance-card',
    'transform:raw'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
