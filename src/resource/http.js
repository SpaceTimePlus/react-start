import axios from './fetch';

/***
 * GET 请求
 * @param url
 * @param responseType : 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
 * @param headers
 */
export function get(url, responseType, headers) {
  if (!responseType) {
    responseType = 'json';
  }
  if (!headers) {
    headers = {
      Accept: 'application/json'
    };
  }
  return axios({
    method: 'get',
    url,
    responseType,
    headers
  });
}

/***
 * POST 请求
 * @param url
 * @param data
 * @param responseType : 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
 * @param headers
 */
export function post(url, data, responseType, headers) {
  if (!responseType) {
    responseType = 'json';
  }
  if (!headers) {
    headers = {
      Accept: 'application/json'
    };
  }
  return axios({
    method: 'post',
    url,
    data,
    responseType,
    headers
  });
}

/***
 * PUT 请求
 * @param url
 * @param data
 * @param responseType : 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
 * @param headers
 */
export function put(url, data, responseType, headers) {
  if (!responseType) {
    responseType = 'json';
  }
  if (!headers) {
    headers = {
      Accept: 'application/json'
    };
  }
  return axios({
    method: 'put',
    url,
    data,
    responseType,
    headers
  });
}

/***
 * DELETE 请求
 * @param url
 * @param data
 * @param responseType : 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
 * @param headers
 */
export function del(url, responseType, headers) {
  if (!responseType) {
    responseType = 'json';
  }
  if (!headers) {
    headers = {
      Accept: 'application/json'
    };
  }
  return axios({
    method: 'delete',
    url,
    responseType,
    headers
  });
}
