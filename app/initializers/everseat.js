import config from '../config/environment';
import Configuration from 'everseat-shared-ember/configuration';

export default {
  name: 'everseat-shared-ember',
  initialize() {
    Configuration.load(config.everseat);
  }
};
