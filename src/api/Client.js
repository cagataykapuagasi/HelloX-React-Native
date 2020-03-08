import { create } from 'apisauce';
import { Platform } from 'react-native';

let token = null;
const ios = 'localhost';
const android = '10.0.2.2';
const client = create({
  baseURL: `http://${Platform.select({ ios, android })}:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function setToken(newToken) {
  token = newToken;
}

/**
 * Sends HTTP request
 */
export function request(method, path, params = {}, customHeaders = {}) {
  const headers = token ? { Authorization: `Bearer ${token}` } : null;

  return client[method](path, params, {
    headers: {
      ...headers,
      ...customHeaders,
    },
  }).then(response => {
    if (response.ok) {
      return Promise.resolve(response.data);
    } else {
      if (response.data) {
        const { message, ...others } = response.data;

        return Promise.reject({
          error: message,
          errors: [],
          ...others,
          status: response.status,
        });
      } else {
        return Promise.reject(response);
      }
    }
  });
}
