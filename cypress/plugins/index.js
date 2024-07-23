const { addMochaContext, mochawesome } = require('mochawesome');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  initPlugin(on, config);
  on('task', addMochaContext);
  on('after:run', (results) => {
    return mochawesome(results);
  });
};