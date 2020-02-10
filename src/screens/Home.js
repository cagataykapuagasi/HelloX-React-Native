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
export default class Home extends Component {
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
        <Text style={styles.username}>{name}</Text>

        <Icon
          style={styles.cardIcon}
          type="antdesign"
          name="caretright"
          color="white"
          size={15}
        />
      </TouchableOpacity>
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
    paddingHorizontal: '20@s',
  },
  card: {
    height: '50@s',
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    borderRadius: '5@s',
    alignItems: 'center',
    marginTop: '15@s',
    paddingHorizontal: '10@s',
    backgroundColor: colors.primary,
  },
  photo: {
    height: '30@s',
    width: '30@s',
    borderRadius: '15@s',
  },
  footer: {
    height: '15@s',
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: '10@s',
  },
  cardIcon: {
    position: 'absolute',
    right: '10@s',
  },
});
