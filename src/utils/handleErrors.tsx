import { languages } from 'res';

const handleRegisterErrors = (error: String) => {
  const { errors } = languages.t('register');

  let username = error.indexOf('username') !== -1 && errors.username;
  let email = error.indexOf('email') !== -1 && errors.email;

  return { username, email };
};

export { handleRegisterErrors };
