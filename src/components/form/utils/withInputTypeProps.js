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
      return {
        autoCorrect: false,
        secureTextEntry: true,
        autoCapitalize: 'none',
        iconName: 'lock',
      };
    case 'password_confirmation':
      return {
        autoCorrect: false,
        secureTextEntry: true,
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
