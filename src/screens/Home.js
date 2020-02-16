import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from '~/components';
import { User } from '~/api';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

@inject('store')
@observer
export default class Home extends Component {
  state = {
    users: null,
    loading: true,
  };

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = async () => {
    const users = await User.getUsers();

    this.setState({
      users,
      loading: false,
    });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => Actions.chat({ item })}
        style={styles.card}>
        <Image
          style={styles.photo}
          source={{ uri: 'https://picsum.photos/200/200' }}
        />
        <View style={styles.usernameView}>
          <Text style={styles.username}>{item.username}</Text>
          <View style={styles.online} />
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => 'id' + index;

  render() {
    const {
      state: { users, loading },
    } = this;

    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text>John</Text>
        </View> */}
        <FlatList
          data={users}
          renderItem={this.renderItem}
          style={styles.container}
          style={styles.flatlist}
          keyExtractor={this.keyExtractor}
          refreshing={loading}
          onRefresh={this.onRefresh}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
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
    paddingHorizontal: 10,
  },
  card: {
    height: '150@s',
    width: width * 0.5 - 20,
    alignItems: 'center',
    borderRadius: '10@s',
    marginTop: '15@s',
    backgroundColor: '#ECE5DD',
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
    backgroundColor: '#25D366',
    position: 'absolute',
    top: '35@s',
  },
});
