/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Require cycle:', 'componentWillReceiveProps', 'WebSocket']);

AppRegistry.registerComponent(appName, () => App);
