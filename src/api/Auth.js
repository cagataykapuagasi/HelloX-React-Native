import { request } from './Client';

export function login(form) {
  return request('post', 'auth/login', form);
}

export function register(form) {
  return request('post', 'auth/register', form);
}
