import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from '~/components';

@inject('store')
@observer
export default class Chats extends Component {
  state = {
    message: null,
  };

  renderItem = ({ item: { name } }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image
          style={styles.photo}
          source={{ uri: 'https://picsum.photos/200/200' }}
        />
        <View style={styles.card2}>
          <View style={styles.card2_1}>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.message} numberOfLines={1}>
              {'Selam :)Selam :)Selam :)Selam :)Selam :)Selam :)Selam :)'}
            </Text>
          </View>

          <View style={styles.card2_2}>
            <Text style={styles.date}>{'Dakika'}</Text>
            <View style={styles.countView}>
              <Text style={styles.count}>{'1'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
        {/* <View style={styles.header}>
          <Text>John</Text>
        </View> */}
        <FlatList
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
          ]}
          renderItem={this.renderItem}
          style={styles.container}
          style={styles.flatlist}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
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
    //backgroundColor: 'yellow',
    paddingHorizontal: '10@s',
  },
  card: {
    height: '75@s',
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: colors.background,
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
    //fontWeight: 'bold',
    marginTop: '5@s',
    fontSize: '13@s',
    color: '#777777',
  },
  count: {
    fontWeight: 'bold',
    fontSize: '11@s',
    color: 'white',
  },
  countView: {
    height: '20@s',
    width: '20@s',
    borderRadius: '10@s',
    backgroundColor: colors.secondary,
    marginTop: '5@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    //fontWeight: 'bold',
    fontSize: '13@s',
    color: '#777777',
  },
  card2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: colors.text,
    marginLeft: '10@s',
    paddingVertical: '20@s',
  },
  card2_1: {
    flex: 1,
  },
  card2_2: {
    alignItems: 'center',
  },
});
