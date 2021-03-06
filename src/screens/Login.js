import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, languages } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Button } from '~/components';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { loginSchema } from '~/utils/validationSchema';

const initialValues = { username: '', password: '' };
const {
  labels: { username, password },
  button,
  register,
} = languages.t('login');

const Login = props => {
  const login = (form, { setErrors, setSubmitting }) => {
    const {
      userStore: { setUser },
    } = props.store;
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
      <Formik initialValues={initialValues} onSubmit={login} validationSchema={loginSchema}>
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form style={styles.forms}>
            <TextInput name="username" label={username} />
            <TextInput name="password" label={password} />

            <View style={styles.register}>
              <TouchableOpacity onPress={Actions.register}>
                <Text style={styles.registerText}>{register}</Text>
              </TouchableOpacity>
            </View>

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
    </Container>
  );
};

export default inject('store')(observer(Login));

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: '20@s',
  },
  labelStyle: {
    fontWeight: 'normal',
    fontSize: '14@s',
  },
  inputStyle: {
    fontSize: '14@s',
  },
  textContainer: {},
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
  forms: {
    flex: 1,
    justifyContent: 'center',
  },
});
