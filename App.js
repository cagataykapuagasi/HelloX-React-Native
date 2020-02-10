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
import { ChatBar, TabIcon } from './src/components/navigations';

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
            sceneStyle={styles.scene}
            titleStyle={styles.title}
            tintColor={colors.headerTint}
            headerTintColor={colors.headerTint}>
            <Stack key="root">
              <Scene hideNavBar component={Login} initial key="login" />
              <Tabs
                //activeBackgroundColor="red"
                //inactiveBackgroundColor="red"
                indicatorStyle={{ backgroundColor: 'white' }}
                labelStyle={{ fontWeight: 'bold' }}
                //activeTintColor="red"
                tabBarStyle={styles.tab}
                //showLabel={false}
                tabBarPosition="top"
                hideNavBar
                key="home">
                <Scene
                  hideNavBar
                  component={Home}
                  tabBarLabel="AnaSayfa"
                />
                <Scene
                  hideNavBar
                  component={Chats}
                  tabBarLabel="Sohbetler"
                />
              </Tabs>

              <Scene key="chat" navBar={ChatBar} component={Chat} />
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
