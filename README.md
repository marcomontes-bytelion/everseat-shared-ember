# Everseat-shared-ember

This is the addon for the shared ember code for Everseat's projects.

## Installation

For new projects including this addon: 

* `ember install everseat/everseat-shared-ember`

## Configuration

Add to the `config/environment.js`

```
  var ENV = {
    // Override default configuration settings...
    everseat: {
      // Look at folder [app/configuration.js] for more default option
    }
  };
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).


## Development

* Clone the project locally
* Change directory to the EMBER project folder
* Remove the existing node_modules directory
* THEN link to the local project using `npm link [local-project-dir]/everseat-shared-ember`
* And enable live-reloading by editing `everseat-ember-cli-pubnub/index.js` and change the isDevelopingAddon. [http://ember-cli.com/extending/#link-to-addon-while-developing]

For reference documentation, read the section about addons [https://ember-cli.com/extending/#addon-project-structure]

In order for the consuming app to customize, add new code, in the `addons` directory, and import the addons in the `app` directory:

```
// addon/model/user.js
import Ember from 'ember';

export default Ember.Model.extend({
  // model code
});
```

```
// app/model/user.js
import User from `everseat-shared-data/app/model/user';

export default User;
```

## Usage

You should be able to use any part of the code like you have it written in your emberapp.

If you need to override your code, just need to import what you need in the place of the model, adapter, serializer, etc.

```
// [emberapp]/app/model/user
import EverseatUser from 'everseat-shared-data/app/model/user';

export default EverseatUser.extend({
  // overrides
});
```

**Important**

If you want the addon's own hooks to execute in your overriden a component or route hooks, don't forget to apply `this._super(...arguments)` to the end of the hook.
