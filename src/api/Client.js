import { create } from 'apisauce';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';

let token = null;
const ios = 'localhost:3000';
const android = '10.0.2.2:3000';
const client = create({
  baseURL: 'https://hellox.herokuapp.com',
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
      if (response.problem === 'NETWORK_ERROR') {
        showMessage({
          message:
            "Something went wrong. We couldn't access to the server. Please try again later.",
          type: 'danger',
        });
        return Promise.reject({ error: 'NETWORK_ERROR' });
      }

      console.log('error', response);

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
