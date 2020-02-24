import { request } from './Client';

export function getRandomUser() {
  return request('get', 'user/random');
}

export function getUsers() {
  return request('get', 'user/all');
}

export function search(username) {
  return request('post', 'user/search', { username: username });
}
