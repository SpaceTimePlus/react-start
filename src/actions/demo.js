/***
 * ACTIONS
 */
import * as http from '../resource/http';

export const demo = async payload => {
  let result = await http.get('http://portal.weiwuu.com/id');
  return result.body.data;
};
