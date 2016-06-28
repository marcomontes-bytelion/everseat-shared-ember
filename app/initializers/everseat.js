import config from '../config/environment';
import Configuration from 'everseat-ember-cli-pubnub/configuration';

export default {
  name: 'everseat-shared-ember',
  initialize() {
    Configuration.load(config.pubnub);
  }
};
