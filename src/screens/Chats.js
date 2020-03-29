import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { images, languages, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { toJS } from 'mobx';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Avatar } from '~/components';

const { empty } = languages.t('chats');

@inject('store')
@observer
export default class Chats extends Component {
  renderItem = ({ item: { user, messages, unRead } }) => {
    const length = messages.length;

    return (
      <TouchableOpacity onPress={() => Actions.chat({ item: user })} style={styles.card}>
        <Avatar style={styles.photo} uri={user.profile_photo} />
        <View style={styles.card2}>
          <View style={styles.card2_1}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.date}>
              {length && moment(messages[length - 1].date).format('HH:mm')}
            </Text>
          </View>

          <View style={styles.card2_2}>
            <Text style={styles.message} numberOfLines={1}>
              {length && messages[length - 1].message}
            </Text>

            {unRead > 0 && (
              <View style={styles.countContainer}>
                <View style={styles.countView}>
                  <Text style={styles.count}>{unRead}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => 'id' + index;

  ListFooterComponent = () => <View style={styles.footer} />;

  ListEmptyComponent = () => <Text style={styles.emptyText}>{empty}</Text>;

  render() {
    const {
      props: {
        store: {
          chatStore: { rooms },
        },
      },
    } = this;

    const _rooms = Object.values(toJS(rooms)).sort((a, b) => b.lastUpdate - a.lastUpdate);

    return (
      <FlatList
        data={_rooms}
        renderItem={this.renderItem}
        style={styles.container}
        style={styles.flatlist}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={this.ListFooterComponent}
        ListEmptyComponent={this.ListEmptyComponent}
      />
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
  flatlist: {
    flex: 1,
    paddingHorizontal: '10@s',
  },

  photo: {
    height: '50@s',
    width: '50@s',
    borderRadius: '25@s',
  },
  footer: {
    height: '15@s',
  },
  username: {
    fontWeight: 'bold',
    fontSize: '14@s',
  },
  message: {
    fontSize: '13@s',
    color: '#777777',
    flexWrap: 'wrap',
    flex: 1,
  },
  count: {
    fontWeight: 'bold',
    fontSize: '11@s',
    color: 'white',
  },
  countView: {
    height: '16@s',
    width: '16@s',
    borderRadius: '8@s',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: '13@s',
    color: '#777777',
  },
  card: {
    height: '75@s',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card2: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: colors.text,
    marginLeft: '10@s',
    paddingVertical: '15@s',
  },
  card2_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: '2@s',
  },
  card2_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    top: '10@s',
  },
  countContainer: {
    width: '22@s',
  },
});
