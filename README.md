# ⚠️ This repository is not longer maintained ⚠️

This project is not longer maintained and has been archived. More details in [One Beyond Governance Tiers](https://onebeyond-maintainers.netlify.app/governance/tiers)

# systemic-mongodb-memory-server

A [systemic](https://github.com/guidesmiths/systemic) [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) component for testing without docker or dedicated mongodb servers.

This component create a temporal server for testing and server is destroyed when tests are finished.

Check configuration options for `mongodbMemoryServer` at official [mongodb-memory-server documentation](https://github.com/nodkz/mongodb-memory-server).

## Usage

```js
const System = require('systemic');
const mongodb = require('mongodb-memory-server');
const config = {
  mongodbMemoryServer: {
    instance: {
      db_name: 'test-db',
    },
  },
};

new System()
  .add('config', config, { scoped: true })
  .add('mongodb', mongodb())
  .dependsOn('config')
  .start((err, components) => {
    // Do your tests
  });
```
