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
import { toJS } from 'mobx';

@inject('store')
@observer
export default class Chat extends Component {
  state = {
    message: null,
  };

  componentDidMount() {
    const { init } = this.props.store.chat;

    init();
  }

  sendMessage = () => {
    const {
      props: {
        store: {
          chat: { sendMessage },
        },
        item: { id },
      },
      state: { message },
    } = this;

    sendMessage(id, message);
  };

  renderItem = ({ item: { name } }) => {
    return (
      <View style={styles.card}>
        <Text>{name}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => 'id' + index;

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
        <FlatList
          inverted
          data={toJS(messages).reverse()}
          renderItem={this.renderItem}
          style={styles.container}
          style={styles.flatlist}
          keyExtractor={this.keyExtractor}
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
            onPress={this.sendMessage}>
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
    //color: 'white',
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
    //backgroundColor: 'yellow',
  },
  card: {
    height: 50,
    borderWidth: 1,
    marginTop: 5,
    marginLeft: '10@s',
  },
});
