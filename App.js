import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {
  Scene,
  Modal,
  Router,
  Actions,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import { Provider } from 'mobx-react';
import { Home, Login, Chat, Chats } from './src/screens';
import { colors } from 'res';
import RNBootSplash from 'react-native-bootsplash';
import { store } from './src/store';
import { ChatBar, TabBar } from './src/components/navigations';

export default class App extends Component {
  componentDidMount() {
    console.log('app js', store);

    store
      .init()
      .then(() => {
        Actions.replace('home', { title: 'lale' });
        //
      })
      .catch(() => {
        //
      })
      .finally(() => RNBootSplash.hide({ duration: 250 }));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Provider store={store}>
          <Router
            onStateChange={store.nav.handleState}
            sceneStyle={styles.scene}
            titleStyle={styles.title}
            tintColor={colors.headerTint}
            headerTintColor={colors.headerTint}>
            <Stack hideNavBar key="root">
              <Scene hideNavBar component={Login} initial key="login" />
              <Tabs
                indicatorStyle={{ backgroundColor: 'white' }}
                labelStyle={{ fontWeight: 'bold' }}
                tabBarStyle={styles.tab}
                tabBarPosition="top"
                tabBarComponent={TabBar}
                hideNavBar
                key="home">
                <Scene
                  hideNavBar
                  component={Home}
                  tabBarLabel="AnaSayfa"
                  key="home_0"
                />
                <Scene
                  hideNavBar
                  component={Chats}
                  tabBarLabel="Sohbetler"
                  key="home_1"
                />
              </Tabs>

              <Stack navBar={ChatBar} key="chat">
                <Scene component={Chat} />
              </Stack>
            </Stack>
          </Router>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: colors.background,
  },
  tab: {
    backgroundColor: colors.lightGray,
  },
  container: {
    flex: 1,
  },
  tab: {
    backgroundColor: colors.primary,
    height: 70,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
  },
});
