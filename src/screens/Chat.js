import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';

@inject('store')
@observer
export default class Chat extends Component {
  state = {
    message: null,
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

  renderItem = ({ item: { name } }) => {
    return (
      <View style={styles.card}>
        <Text>{name}</Text>
      </View>
    );
  };

  render() {
    const {
      props: {
        store: {
          chat: { messages },
        },
      },
      state: { message },
    } = this;

    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text>John</Text>
        </View> */}
        <FlatList
          inverted
          data={[
            { name: 'lale' },
            { name: 'lale2' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
            { name: 'lale3' },
          ].reverse()}
          renderItem={this.renderItem}
          style={styles.container}
          style={styles.flatlist}
        />

        <View style={styles.footer}>
          <TextInput
            value={message}
            onChangeText={message => this.setState({ message })}
            style={styles.input}
            placeholder="Bir Mesaj Yaz"
            placeholderTextColor="#d4d4d4"
          />
          <TouchableOpacity
            style={styles.footerButton}
            onPress={this.login}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5@s',
    paddingRight: '10@s',
    paddingBottom: '5@s',
  },
  footerButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    borderRadius: 25,
    left: '5@s',
  },
  input: {
    borderWidth: 1,
    borderColor: '#128C7E',
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12@s',
  },
  header: {
    height: '75@s',
    backgroundColor: '#128C7E',
  },
  flatlist: {
    marginBottom: 5,
    flex: 1,
    backgroundColor: 'yellow',
  },
  card: {
    height: 50,
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 5,
  },
});
