import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, languages } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Button } from '~/components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { registerSchema } from '~/utils/validationSchema';
import { handleRegisterErrors } from '~/utils/handleErrors';

const initialValues = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const {
  labels: { username, email, password, password_confirmation },
  button,
} = languages.t('register');

const Register = props => {
  const register = ({ password_confirmation, ...form }, { setErrors, setSubmitting }) => {
    const {
      userStore: { setUser },
      chatStore: { init },
    } = props.store;
    Auth.register(form)
      .then(res => {
        setUser(res);
        init();
        Actions.home();
      })
      .catch(({ error }) => {
        setErrors(handleRegisterErrors(error));
        setSubmitting(false);
      });
  };

  return (
    <Container colors={colors.auth} style={styles.container}>
      <View style={styles.textContainer}>
        <Formik initialValues={initialValues} onSubmit={register} validationSchema={registerSchema}>
          {({ handleSubmit, isSubmitting, isValid }) => (
            <Form style={styles.forms}>
              <TextInput name="username" label={username} />
              <TextInput name="email" label={email} />
              <TextInput name="password" label={password} />
              <TextInput name="password_confirmation" label={password_confirmation} />

              <Button
                horizontal
                colors={colors.button}
                text={button}
                distance={50}
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
              />
            </Form>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default inject('store')(observer(Register));

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingTop: '50@s',
  },
  labelStyle: {
    fontWeight: 'normal',
    fontSize: '14@s',
  },
  inputStyle: {
    fontSize: '14@s',
  },
  textContainer: {
    paddingHorizontal: '20@s',
  },
});
