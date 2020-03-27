import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { languages, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { toJS } from 'mobx';
import Icon from '~/components/Icon';
import moment from 'moment';

const { placeholder, placeholderError } = languages.t('chat');

@inject('store')
@observer
export default class Chat extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    const {
      store: {
        chatStore: { subscribeToUser },
      },
      item: { id },
    } = this.props;

    subscribeToUser(id);
  }

  componentWillUnmount() {
    const {
      getRandomUser,
      store: {
        chatStore: { closeRoom, unSubscribeToUser },
      },
      item: { id },
    } = this.props;

    closeRoom(id);
    unSubscribeToUser(id);
    if (getRandomUser) {
      getRandomUser();
    }
  }

  sendMessage = () => {
    const {
      props: {
        store: {
          chatStore: { sendMessage, init },
        },
        item: { id, profile_photo },
      },
      state: { message },
    } = this;

    if (message.trim().length > 0) {
      sendMessage({ recipientId: id, message, profile_photo });
      this.setState({ message: '' });
    }
  };

  renderItem = ({ item: { type, message, date } }) => {
    return (
      <View style={styles[type === 'sent' ? 'sent' : 'received']}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{moment(date).format('HH:mm')}</Text>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => 'id' + index;

  ListHeaderComponent = () => <View style={styles.listHeader} />;

  render() {
    const {
      props: {
        store: {
          chatStore: { getRoom, connected },
        },
        item,
      },
      state: { message },
    } = this;

    return (
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={75}
        style={styles.container}
        behavior="padding">
        <View style={styles.container}>
          <FlatList
            inverted
            data={toJS(getRoom(item)).reverse()}
            renderItem={this.renderItem}
            style={styles.flatlist}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={this.ListHeaderComponent}
          />

          <View style={styles.footer}>
            <TextInput
              value={message}
              onChangeText={message => this.setState({ message })}
              style={styles.input}
              placeholder={connected ? placeholder : placeholderError}
              editable={connected}
              multiline
            />
            <TouchableOpacity style={styles.footerButton} onPress={this.sendMessage}>
              <Icon type="material" name="send" size={20} color={colors.background} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const card = {
  marginTop: '10@s',
  borderRadius: '8@s',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowColor: colors.text,
  shadowRadius: 0.3,
  shadowOpacity: 1,
  elevation: 1,
  maxWidth: '90%',
  flexDirection: 'row',
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.chatBackground,
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
    borderRadius: '22.5@s',
    left: '5@s',
    paddingLeft: '2@s',
  },
  input: {
    borderWidth: 1,
    borderColor: '#128C7E',
    height: '45@s',
    flex: 1,
    borderRadius: '22.5@s',
    paddingHorizontal: 20,
    fontSize: '13@s',
    backgroundColor: colors.background,
    paddingTop: '14@s',
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
    flex: 1,
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
  listHeader: {
    height: 10,
  },
  date: {
    color: colors.text,
    fontSize: '11@s',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  message: {
    fontSize: '14@s',
  },
  dateContainer: {
    bottom: '3@s',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: '5@s',
  },
  messageContainer: {
    maxWidth: '90%',
    padding: '5@s',
  },
});
