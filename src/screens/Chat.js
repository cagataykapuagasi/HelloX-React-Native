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

    //init();
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

    this.setState({ message: null });

    sendMessage(id, message);
  };

  renderItem = ({ item: { type, message } }) => {
    return (
      <View style={styles[type === 'sent' ? 'sent' : 'received']}>
        <Text>{message}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => 'id' + index;

  render() {
    const {
      props: {
        store: {
          chat: { rooms, getRoom },
          user: { user },
        },
        item: { id },
      },
      state: { message },
    } = this;

    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={toJS(getRoom(id)).reverse()}
          renderItem={this.renderItem}
          style={styles.flatlist}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={<View style={{ height: 10 }} />}
        />

        <View style={styles.footer}>
          <TextInput
            value={message}
            onChangeText={message => this.setState({ message })}
            style={styles.input}
            placeholder="Bir Mesaj Yaz"
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

const card = {
  marginTop: '10@s',
  borderRadius: '8@s',
  padding: '10@s',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowColor: colors.text,
  shadowRadius: 0.3,
  shadowOpacity: 1,
  elevation: 1,
  maxWidth: '90%',
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5@s',
    paddingRight: '10@s',
    paddingVertical: '5@s',
  },
  footerButton: {
    height: '45@s',
    width: '45@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    borderRadius: 25,
    left: '5@s',
  },
  input: {
    borderWidth: 1,
    borderColor: '#128C7E',
    height: '45@s',
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: '14@s',
    //color: 'white',
  },
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: '12@s',
  },
  header: {
    height: '75@s',
    backgroundColor: '#128C7E',
  },
  flatlist: {
    //paddingBottom: 5,
    flex: 1,
    //backgroundColor: 'yellow',
    paddingBottom: 45,
  },
  sent: {
    ...card,
    marginRight: '10@s',
    backgroundColor: colors.chatCard,
    alignSelf: 'flex-end',
  },
  received: {
    ...card,
    marginLeft: '10@s',
    backgroundColor: colors.background,
    alignSelf: 'flex-start',
  },
});
