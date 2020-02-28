import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import { Icon } from '~/components';

const { width, height } = Dimensions.get('window');
const tabs = ['ANASAYFA', 'SOHBETLER'];
const tabWidth = width / tabs.length;
const animatedBar = new Animated.Value(0);

const TabBar = props => {
  const navigate = key => {
    props.jumpTo(key);
  };

  const animate = key => {
    const index = key.substr(-1);
    const toValue = tabWidth * index;

    Animated.timing(animatedBar, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const { currentScreen } = props.store.nav;
  animate(currentScreen);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View style={styles.settingsView}>
          <TouchableOpacity style={styles.settings}>
            <Icon
              type="fontawesome"
              name="ellipsis-v"
              size={20}
              color={colors.background}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tab}>
        {props.navigationState.routes.map(({ key }, index) => (
          <TouchableOpacity
            key={key}
            onPress={() => navigate(key)}
            style={styles.button}>
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

        <Animated.View
          style={[
            styles.bar,
            { transform: [{ translateX: animatedBar }] },
          ]}
        />
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
    fontWeight: '600',
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
