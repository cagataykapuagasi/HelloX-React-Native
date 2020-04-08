import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { languages, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { toJS } from 'mobx';
import { Icon, ChatLoader } from '~/components';
import moment from 'moment';

const { placeholder, placeholderError } = languages.t('chat');

@inject('store')
@observer
export default class Chat extends Component {
  height = new Animated.Value(scale(40));
  contentHeight = 40;

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
          chatStore: { sendMessage },
        },
        item: { id, profile_photo },
      },
      state: { message },
    } = this;

    if (message.trim().length > 0) {
      sendMessage({ recipientId: id, message, profile_photo });
      this.setState({ message: '' });
      this.animate(40);
    }
  };

  renderItem = ({ item: { type, message, date }, index }) => {
    const { messages } = this;
    const upperMessage = messages[index + 1];
    const marginTop = scale(upperMessage && upperMessage.type === type ? 2 : 5);

    return (
      <View style={[styles[type === 'sent' ? 'sent' : 'received'], { marginTop }]}>
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

  onContentSizeChange = ({
    nativeEvent: {
      contentSize: { height },
    },
  }) => {
    const { firstContentHeight, currentContentHeight } = this;

    if (!firstContentHeight) {
      this.firstContentHeight = height;

      return;
    }

    if (firstContentHeight === height) {
      return;
    }

    if (height > currentContentHeight && height / firstContentHeight < 6) {
      this.contentHeight += 20;
      this.animate(this.contentHeight);
    } else if (height < currentContentHeight && height / firstContentHeight < 5) {
      this.contentHeight -= 20;
      this.animate(this.contentHeight);
    }

    this.currentContentHeight = height;
  };

  animate = (contentHeight) =>
    Animated.timing(this.height, {
      toValue: scale(contentHeight),
      duration: 200,
    }).start();

  render() {
    const {
      props: {
        store: {
          chatStore: { getRoom, connected },
        },
        item,
      },
      state: { message },
      height,
    } = this;

    this.messages = toJS(getRoom(item)).reverse();

    return (
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={80}
        style={styles.container}
        behavior="padding">
        <View style={styles.container}>
          {connected ? (
            <FlatList
              inverted
              data={this.messages}
              renderItem={this.renderItem}
              style={styles.flatlist}
              keyExtractor={this.keyExtractor}
              ListHeaderComponent={this.ListHeaderComponent}
            />
          ) : (
            <View style={styles.container}>
              <ChatLoader />
            </View>
          )}

          <View style={styles.footer}>
            <Animated.View style={[styles.inputContainer, { height }]}>
              <TextInput
                value={message}
                onChangeText={(message) => this.setState({ message })}
                style={styles.input}
                placeholder={connected ? placeholder : placeholderError}
                editable={connected}
                multiline
                onContentSizeChange={this.onContentSizeChange}
              />
            </Animated.View>

            <TouchableOpacity
              disabled={!connected}
              style={[styles.footerButton, { opacity: connected ? 1 : 0.8 }]}
              onPress={this.sendMessage}>
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
    paddingBottom: '2@s',
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
    flex: 1,
    borderColor: '#128C7E',
    borderRadius: '20@s',
    fontSize: '13@s',
    justifyContent: 'center',
    paddingTop: '12@s',
  },
  inputContainer: {
    flex: 1,
    borderRadius: '20@s',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
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
