const handleRegisterErrors = (error: String) => {
  let username =
    error.indexOf('username') !== -1 && 'Username is already taken.';
  let email = error.indexOf('email') !== -1 && 'Email is already taken.';

  return { username, email };
};

export { handleRegisterErrors };
