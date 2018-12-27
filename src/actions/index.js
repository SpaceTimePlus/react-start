/***
 * ACTIONS
 */

export const demo = async payload => {
  console.log('demo action run', payload);
  setTimeout(() => {
    console.log('TTTT');
  }, 3000);
};
