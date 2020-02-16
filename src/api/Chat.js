import { request } from './Client';

export function login(form) {
  return request('post', 'user/login', form);
}
