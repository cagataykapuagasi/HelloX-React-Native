import { mapProps } from 'recompose';

const getInputTypeProps = name => {
  switch (name) {
    case 'email':
      return {
        autoCorrect: false,
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        iconName: 'envelope',
      };

    case 'password':
    case 'new_password':
    case 'new_password_confirmation':
    case 'password_confirmation':
      return {
        autoCorrect: false,
        autoCapitalize: 'none',
        iconName: 'lock',
      };
    case 'username':
      return {
        leftIcon: 'user',
        autoCorrect: false,
        iconName: 'user',
        autoCapitalize: 'none',
      };
    default:
      return {};
  }
};

const withInputTypeProps = mapProps(({ name, ...props }) => ({
  ...getInputTypeProps(name),
  ...props,
}));

export default withInputTypeProps;
