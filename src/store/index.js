import camelCase from 'lodash/camelCase';

const requireModule = require.context('./', false, /\.js$/);
const stores = {};

requireModule.keys().forEach(fileName => {
  const storeName = camelCase(fileName.replace(/(\.\/|\.ts)/g, ''));

  stores[storeName] = {
    ...requireModule(fileName)
  };
});
console.log('stores', stores);
export default stores;
