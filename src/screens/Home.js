import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { images, languages, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon, SearchBar } from '~/components';
import { User } from '~/api';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('window');

const { empty } = languages.t('home');
const { home } = languages.t('alerts');

@inject('store')
@observer
export default class Home extends Component {
  state = {
    users: null,
    loading: false,
    random: null,
  };

  async componentDidMount() {
    this.getRandomUser();
  }

  getRandomUser = async () => {
    const random = await User.getRandomUser();

    if (random) {
      this.setState({
        random,
      });
    }
  };

  openRandomUser = () => {
    const {
      state: { random },
      getRandomUser,
    } = this;

    Actions.chat({ item: random, getRandomUser });
    this.setState({
      random: null,
    });
  };

  searchUser = text => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (!text.length) {
      this.setState({ loading: false, users: null });
      return;
    }
    this.setState({ loading: true, users: null });

    this.timeout = setTimeout(() => {
      User.search(text)
        .then(users => this.setState({ users, loading: false }))
        .catch(e => showMessage({ type: 'danger', message: home }));
    }, 500);
  };

  openChatScreen = item => {
    const { getRandomUser } = this;

    Actions.chat({ item, getRandomUser });
  };

  renderItem = ({ item }) => {
    const { profile_photo, username, status, about } = item;

    const source = profile_photo ? { uri: profile_photo } : images.user;
    return (
      <TouchableOpacity
        onPress={() => this.openChatScreen(item)}
        style={[
          styles.card,
          {
            borderBottomColor: colors[status ? 'online' : 'offline'],
          },
        ]}>
        <FastImage style={styles.photo} source={source} />
        <View style={styles.usernameView}>
          <Text style={styles.username}>{username}</Text>
          <Text numberOfLines={1} style={styles.status}>
            {about}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  ListFooterComponent = () => (
    <View style={styles.footer}>
      {this.state.loading && <ActivityIndicator style={styles.indicator} />}
    </View>
  );

  ListHeaderComponent = () => (
    <SearchBar
      openRandomUser={this.openRandomUser}
      random={this.state.random}
      onChangeText={this.searchUser}
    />
  );

  ListEmptyComponent = () => <Text style={styles.emptyText}>{empty}</Text>;

  keyExtractor = (item, index) => 'id' + index;

  render() {
    const {
      state: { users, loading },
    } = this;

    return (
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={this.renderItem}
          style={styles.flatlist}
          keyExtractor={this.keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          ListFooterComponent={this.ListFooterComponent}
          ListHeaderComponent={this.ListHeaderComponent}
          ListEmptyComponent={!loading && users && this.ListEmptyComponent}
          extraData={this.state}
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
    height: '50@s',
    borderRadius: '10@s',
    paddingHorizontal: '20@s',
    marginTop: '5@s',
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    height: '60@s',
    width: width * 0.5 - 20,
    borderRadius: '10@s',
    borderTopLeftRadius: 0,
    marginTop: '15@s',
    borderWidth: 0.5,
    borderBottomWidth: 2,
    flexDirection: 'row',
    borderColor: colors.text,
  },
  photo: {
    height: '50@s',
    width: '50@s',
    borderBottomRightRadius: '10@s',
  },
  usernameView: {
    flex: 1,
    paddingTop: '5@s',
    justifyContent: 'space-between',
    paddingBottom: '15@s',
    overflow: 'hidden',
    paddingHorizontal: '10@s',
  },
  footer: {
    height: '15@s',
  },
  username: {
    fontSize: '14@s',
    fontWeight: '600',
    color: colors.text,
  },
  status: {
    fontSize: '13@s',
    fontWeight: '400',
    color: colors.text,
  },
  cardIcon: {
    position: 'absolute',
    right: '10@s',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  online: {
    height: '10@s',
    width: '10@s',
    borderRadius: '5@s',
    position: 'absolute',
    top: '35@s',
  },
  indicator: {
    top: '5@s',
  },
  emptyText: {
    textAlign: 'center',
    top: '10@s',
  },
});
