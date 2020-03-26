import { request } from './Client';

export function getRandomUser() {
  return request('get', 'user/random');
}

export function getUser() {
  return request('get', 'user/profile');
}

export function deleteAccount() {
  return request('delete', 'user/profile');
}

export function search(username) {
  return request('post', 'user/search', { username });
}

export function updatePassword(form) {
  return request('post', 'user/profile/update-password', form);
}

export function updatePhoto(photo) {
  return request('post', 'user/profile/update-photo', photo, {
    'Content-Type': 'multipart/form-data',
    Accept: 'multipart/form-data',
  });
}

export function updateAbout(about) {
  return request('post', 'user/profile/update-about', { about });
}

export function updateLanguage(language) {
  return request('post', 'user/profile/update-language', { language });
}
