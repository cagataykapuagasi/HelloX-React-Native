import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon, SearchBar } from '~/components';
import { User } from '~/api';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

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
        .catch(e => console.log(e));
    }, 500);
  };

  openChatScreen = item => {
    const { getRandomUser } = this;

    Actions.chat({ item, getRandomUser });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.openChatScreen(item)}
        style={styles.card}>
        <Image
          style={styles.photo}
          source={{ uri: 'https://picsum.photos/200/200' }}
        />
        <View style={styles.usernameView}>
          <Text style={styles.username}>{item.username}</Text>
          <View
            style={[
              styles.online,
              {
                backgroundColor:
                  colors[item.status ? 'online' : 'offline'],
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  ListFooterComponent = () => (
    <View style={styles.footer}>
      {this.state.loading && (
        <ActivityIndicator style={styles.indicator} />
      )}
    </View>
  );

  ListHeaderComponent = () => (
    <SearchBar
      openRandomUser={this.openRandomUser}
      random={this.state.random}
      onChangeText={this.searchUser}
    />
  );

  ListEmptyComponent = () => (
    <Text style={styles.emptyText}>Kullanıcı bulunamadı.</Text>
  );

  keyExtractor = (item, index) => 'id' + index;

  render() {
    const {
      state: { users, loading },
    } = this;

    console.log('home', users);

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
    height: '150@s',
    width: width * 0.5 - 20,
    alignItems: 'center',
    borderRadius: '10@s',
    marginTop: '15@s',
    backgroundColor: '#d4d4d4',
  },
  photo: {
    height: '100@s',
    width: '100%',
    borderTopLeftRadius: '10@s',
    borderTopRightRadius: '10@s',
  },
  usernameView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10@s',
  },
  footer: {
    height: '15@s',
  },
  username: {
    fontWeight: 'bold',
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
