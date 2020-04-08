import { create } from 'apisauce';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { languages } from 'res';
import { BASE_URL } from 'react-native-dotenv';
import { refreshToken } from '../store/userStore';

const { clientMessage } = languages.t('alerts');

let token = null;
let refresh_token = null;
const client = create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function setToken({ token: newToken, refresh_token: refreshToken }) {
  token = newToken;
  refresh_token = refreshToken;
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
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      return Promise.resolve(response.data);
    } else {
      if (response.status === 401) {
        return client['post']('auth/refresh_token', { refresh_token }).then((res) => {
          refreshToken(res);
          return request(method, path, params, customHeaders);
        });
      }

      if (response.problem === 'NETWORK_ERROR') {
        showMessage({
          message: clientMessage,
          type: 'danger',
        });
        return Promise.reject({ error: 'NETWORK_ERROR' });
      }

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
