import camelCase from 'lodash/camelCase';

const requireModule = require.context('./', false, /\.js$/);
const stores = {};

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return;

  const storeName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));

  stores[storeName] = requireModule(fileName).default;
});

export default stores;
