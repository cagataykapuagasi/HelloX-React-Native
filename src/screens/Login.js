import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Button } from '~/components';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { loginSchema } from '~/utils/validationSchema';

const initialValues = { username: '', password: '' };

const Login = props => {
  const login = (form, { setErrors, setSubmitting }) => {
    const { setUser } = props.store.user;
    Auth.login(form)
      .then(res => {
        setUser(res);
        Actions.home();
      })
      .catch(({ error }) => {
        setSubmitting(false);
        setErrors(error);
      });
  };

  return (
    <Container colors={colors.auth} style={styles.container}>
      <View style={styles.textContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={login}
          validationSchema={loginSchema}>
          {({ handleSubmit, isSubmitting, isValid }) => (
            <Form style={styles.forms}>
              <TextInput name="username" label="username" />
              <TextInput name="password" label="password" />

              <View style={styles.register}>
                <TouchableOpacity onPress={Actions.register}>
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
              </View>

              <Button
                horizontal
                colors={colors.button}
                text="Login"
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

export default inject('store')(observer(Login));

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
  register: {
    top: '5@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: '11@s',
    fontWeight: 'bold',
    color: 'white',
  },
});
