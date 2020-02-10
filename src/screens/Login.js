import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';

@inject('store')
@observer
export default class Login extends Component {
  state = {
    username: null,
    password: null,
  };

  login = () => {
    const {
      state: { username, password },
      props: {
        store: { user },
      },
    } = this;

    user.login({ username, password });
  };

  render() {
    const { username, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          value={username}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
          style={{ borderWidth: 1, height: 50, width: 250 }}
        />
        <TextInput
          value={password}
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          style={{ borderWidth: 1, height: 50, width: 250, marginTop: 20 }}
        />

        <TouchableOpacity onPress={this.login}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//export default Login;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
