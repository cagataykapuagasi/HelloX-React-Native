import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Scene, Router, Actions, Stack, Tabs } from 'react-native-router-flux';
import { Provider } from 'mobx-react';
import { Home, Login, Chat, Chats, Register, Settings, ChangePassword } from './src/screens';
import { colors, languages } from 'res';
import RNBootSplash from 'react-native-bootsplash';
import { store } from './src/store';
import { ChatBar, TabBar, BackButton } from './src/components/navigations';
import DropDown from '~/components/drowdown';
import FlashMessage from 'react-native-flash-message';
import { MessageComponent, Alert } from '~/components';

const { login, register, settings, change_password } = languages.t('app');

export default class App extends Component {
  state = { backgroundColor: colors.secondary };

  componentDidMount() {
    store.init();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Provider store={store}>
          <View onTouchStart={store.navStore.hideDropDown} style={styles.container}>
            <Router
              onStateChange={store.navStore.handleState}
              sceneStyle={styles.scene}
              titleStyle={styles.title}
              tintColor={colors.headerTint}
              headerTintColor={colors.headerTint}>
              <Stack hideNavBar key="root">
                <Stack type="reset" key="login">
                  <Scene component={Login} initial navTransparent title={login} />
                </Stack>

                <Stack navTransparent key="register" title={register}>
                  <Scene renderBackButton={BackButton} component={Register} />
                </Stack>

                <Tabs
                  indicatorStyle={styles.indicatorStyle}
                  labelStyle={styles.labelStyle}
                  tabBarStyle={styles.tab}
                  tabBarPosition="top"
                  tabBarComponent={TabBar}
                  hideNavBar
                  type="reset"
                  key="home">
                  <Scene hideNavBar component={Home} key="home_0" />
                  <Scene hideNavBar component={Chats} key="home_1" />
                </Tabs>

                <Stack navBar={ChatBar} key="chat">
                  <Scene component={Chat} />
                </Stack>
                <Stack key="settings">
                  <Scene
                    component={Settings}
                    renderBackButton={BackButton}
                    title={settings}
                    navigationBarStyle={styles.navigationBarStyle}
                  />
                </Stack>
                <Stack key="changePassword">
                  <Scene
                    component={ChangePassword}
                    renderBackButton={BackButton}
                    title={change_password}
                    navigationBarStyle={styles.navigationBarStyle}
                  />
                </Stack>
              </Stack>
            </Router>
          </View>
          <DropDown />
        </Provider>
        <FlashMessage MessageComponent={MessageComponent} position="top" />
        <Alert />
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
  navigationBarStyle: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  labelStyle: {
    fontWeight: 'bold',
  },
});
