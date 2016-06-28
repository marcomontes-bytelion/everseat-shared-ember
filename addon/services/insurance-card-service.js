import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Service.extend({

  store: Ember.inject.service(),

  buildCard(card_type) {
    return this.get('store').createRecord('insurance-card', { card_type });
  },

  createCard(userId, changes) {
    const postdata = _.merge({
      user_id: userId
    }, _.omit(changes, 'action'));
    return this.get('store')
      .createRecord('insurance-card', postdata)
      .save();
  },

  destroyCard(cardId) {
    const card = this.get('store')
      .peekRecord('insurance-card', cardId);
    return card.destroyRecord();
  },

  updateCard(cardId, patchData) {
    let card = this.get('store').peekRecord('insurance-card', cardId);
    _.keys(patchData).forEach((key) => {
      card.set(key, patchData[key]);
    });
    return card.save();
  },

  doAction(userId, change) {
    const { action } = change;
    switch (action) {
      case 'create':
        return this.createCard(userId, change);
      case 'destroy':
        if (!change.id) {
          return;
        }
        return this.destroyCard(change.id);
      case 'patch':
        Ember.assert('change.action=patch requires an id', change.id);
        const patchData = _.omit(change, ['action', 'id']);
        return this.updateCard(change.id, patchData);
      default:
        Ember.assert(`change.action is invalid ${action}`);
    }
  }
});
