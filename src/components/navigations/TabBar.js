import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated, SafeAreaView } from 'react-native';
import { languages, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import { Icon } from '~/components';

const { tab1, tab2, dropdown1, dropdown2 } = languages.t('tabBar');
const { width, height } = Dimensions.get('window');
const tabs = [tab1, tab2];
const tabWidth = width / tabs.length;
const animatedBar = new Animated.Value(0);

const TabBar = props => {
  const {
    navStore: { currentScreen, openDropDown },
    userStore: { logOut },
  } = props.store;

  useEffect(() => animate(), [currentScreen]);

  const navigate = key => {
    props.jumpTo(key);
  };

  const animate = key => {
    if (!['home_0', 'home_1'].includes(currentScreen)) {
      return;
    }

    const index = currentScreen.substr(-1);
    const toValue = tabWidth * index;

    Animated.timing(animatedBar, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const data = [
    { text: dropdown1, onPress: () => Actions.settings() },
    { text: dropdown2, onPress: () => logOut() },
  ];

  const openDropdown = () => openDropDown(data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={openDropdown} style={styles.settings}>
          <Icon type="fontawesome" name="ellipsis-v" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>
      <View style={styles.tab}>
        {props.navigationState.routes.map(({ key }, index) => (
          <TouchableOpacity key={key} onPress={() => navigate(key)} style={styles.button}>
            <Text
              style={[
                styles.text,
                {
                  opacity: currentScreen === key ? 1 : 0.7,
                },
              ]}>
              {tabs[index]}
            </Text>
          </TouchableOpacity>
        ))}

        <Animated.View style={[styles.bar, { transform: [{ translateX: animatedBar }] }]} />
      </View>
    </SafeAreaView>
  );
};

export default inject('store')(observer(TabBar));

const styles = ScaledSheet.create({
  container: {
    height: height * 0.15,
    width,
    backgroundColor: colors.primary,
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  head: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '10@s',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '15@s',
  },
  text: {
    fontSize: '13@s',
    fontWeight: 'bold',
    color: colors.background,
  },
  bar: {
    width: width * 0.5,
    height: '2@s',
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: '0.4@vs',
    left: 0,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 5,
  },
  settings: {
    height: '30@s',
    width: '30@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15@s',
    backgroundColor: colors.primary,
  },
  settingsView: {
    borderRadius: '15@s',
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
});
