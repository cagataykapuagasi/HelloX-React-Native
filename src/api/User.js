import { request } from './Client';

export function getRandomUser() {
  return request('get', 'user/random');
}

export function getUsers() {
  return request('get', 'user/all');
}
