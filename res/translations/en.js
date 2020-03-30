export default {
  app: {
    login: 'Login',
    register: 'Register',
    settings: 'Settings',
    change_password: 'Change Password',
  },
  login: {
    labels: { username: 'username', password: 'password' },
    button: 'Login',
    register: 'Register',
  },
  register: {
    labels: {
      username: 'username',
      email: 'email',
      password: 'password',
      password_confirmation: 'password again',
    },
    button: 'Register',
    errors: { username: 'Username is already taken.', email: 'Email is already taken.' },
  },
  change_password: {
    labels: {
      password: 'password',
      new_password: 'new password',
      new_password_confirmation: 'new password again',
    },
    button: 'Change',
  },
  settings: {
    placeholder: 'Write something about you...',
    line1: 'Change password',
    line2: 'Rate us',
    line3: 'Contact us',
    deleteAc: 'Delete account',
  },
  home: {
    empty: 'User not found.',
  },
  chats: {
    empty: 'No message yet.',
  },
  chat: {
    placeholder: 'Type a message',
    placeholderError: 'Trying to connect to chat...',
  },
  tabBar: {
    tab1: 'HOME',
    tab2: 'CHATS',
    dropdown1: 'Settings',
    dropdown2: 'Sign Out',
  },
  chatBar: {
    dropdown1: 'Delete',
    online: 'Online',
    offline: 'Offline',
  },
  searchBar: {
    label: 'Find Users',
    button: 'Rand',
  },
  alerts: {
    settings: {
      delete: {
        title: 'Delete account',
        text: 'Your account will be deleted',
        buttons: { yes: 'Yes', no: 'No' },
      },
      photo: "Something went wrong. We couldn't upload your photo.",
      about: "Something went wrong. We couldn't update your about.",
    },
    home: "Something went wrong. We couldn't search users.",
    change_password: 'Password was updated.',
    clientMessage:
      "Something went wrong. We couldn't access to the server. Please try again later.",
    userStore: "Something went wrong. We couldn't delete your account.",
    logOut: {
      title: 'Sign out',
      text: 'Your messages will be deleted',
      buttons: { yes: 'Yes', no: 'No' },
    },
  },
};
