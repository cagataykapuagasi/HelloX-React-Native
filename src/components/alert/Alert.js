import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Icon, Avatar, Button } from '~/components';
import { ScaledSheet } from 'react-native-size-matters';
import { colors } from 'res';
import { hideMessage } from 'react-native-flash-message';
import Modal from 'react-native-modal';
import AlertManager from './AlertManager';

const { width } = Dimensions.get('window');

export function showAlert(props) {
  const ref = AlertManager.getDefault();

  if (ref) {
    ref.openModal(props);
  }
}

export function register() {}

export default class Alert extends Component {
  state = {
    visible: false,
    loading: false,
    props: {},
  };

  componentDidMount() {
    AlertManager.register(this);
  }

  openModal = props => {
    this.setState({ props, visible: true, loading: false });
  };

  _onPress = async () => {
    const { onPress } = this.state.props;

    this.setState({ loading: true });
    onPress && (await onPress());
    this.closeModal();
  };

  //test3@gmail.com

  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { title, text, buttons = { yes: '', no: '' } } = this.state.props;

    console.log('props', this.state);

    // const [visible, setVisible] = useState(false);
    // const [loading, setLoading] = useState(false);

    const { loading, visible } = this.state;

    return (
      <Modal
        //ref={ref => (ref = ref)}
        isVisible={visible}
        onSwipeComplete={this.closeModal}
        onBackdropPress={this.closeModal}
        swipeDirection={['left', 'right', 'down']}
        style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.part}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{text}</Text>
          </View>
          <View style={styles.part2}>
            <Button
              colors={[colors.primaryHeavy, '#096E62', '#0A7467']}
              onPress={this._onPress}
              loading={loading}
              style={styles.button1}
              text={buttons.yes}
              distance={0}
              horizontal
            />

            <TouchableOpacity onPress={this.closeModal} disabled={loading} style={styles.button2}>
              <Text style={styles.no}>{buttons.no}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: '150@s',
    width: '100%',
    backgroundColor: colors.background,
    borderTopLeftRadius: '8@s',
    borderTopRightRadius: '8@s',
  },
  part: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '20@s',
  },
  button1: {
    height: '60@s',
    width: width * 0.5 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 140, 126, 1)',
    borderRadius: '8@s',
  },
  button2: {
    height: '60@s',
    width: width * 0.5 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 140, 126, 0.3)',
    borderRadius: '8@s',
  },
  yes: {
    fontSize: '14@s',
    color: colors.background,
    fontWeight: 'bold',
  },
  no: {
    fontSize: '14@s',
    color: colors.primaryHeavy,
    fontWeight: 'bold',
  },
  title: {
    fontSize: '14@s',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '14@s',
    top: '5@s',
  },
});
