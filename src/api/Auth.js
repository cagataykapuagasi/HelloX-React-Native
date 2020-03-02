import { request } from './Client';

export function login(form) {
  return request('post', 'user/login', form);
}

export function register(form) {
  return request('post', 'user/register', form);
}
