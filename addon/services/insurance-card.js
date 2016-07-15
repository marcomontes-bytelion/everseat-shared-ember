import Ember from 'ember';
import lo from 'lodash/lodash';

export default Ember.Service.extend({

  store: Ember.inject.service(),

  buildCard(params = {}) {
    Ember.assert('user_id is missing', parseInt(params.user_id) !== Math.isNaN);
    return this.get('store').createRecord('insurance-card', params);
  },

  peekCard(cardId = null) {
    Ember.assert('cardId is missing', parseInt(cardId) !== Math.isNaN);
    return this.get('store').peekRecord('insurance-card', cardId);
  },

  createCard(userId, changes) {
    const postdata = lo.merge({
      user_id: userId
    }, lo.omit(changes, 'action'));
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
    lo.keys(patchData).forEach((key) => {
      card.set(key, patchData[key]);
    });
    return card.save();
  },

  clearPhoto(card) {
    card.set('photo_file_name', null);
    card.set('photo_thumb', null);
    card.set('photo_url', null);
    card.set('photo', null);
  },

  unloadRecord(card) {
    this.get('store').unloadRecord(card);
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
        const patchData = lo.omit(change, ['action', 'id']);
        return this.updateCard(change.id, patchData);
      default:
        Ember.assert(`change.action is invalid ${action}`);
    }
  }
});
