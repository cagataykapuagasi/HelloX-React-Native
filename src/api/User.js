import { request } from './Client';

export function getUsers() {
  return request('get', 'user');
}
