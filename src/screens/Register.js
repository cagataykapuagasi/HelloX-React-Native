import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { colors, languages } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Button } from '~/components';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { registerSchema } from '~/utils/validationSchema';
import { handleRegisterErrors } from '~/utils/handleErrors';

const { height } = Dimensions.get('window');

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
        Actions.home();
      })
      .catch(({ error }) => {
        setErrors(handleRegisterErrors(error));
        setSubmitting(false);
      });
  };

  return (
    <Container colors={colors.auth} style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </Container>
  );
};

export default inject('store')(observer(Register));

const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
  textContainer: {
    flex: 1,
  },
  forms: {
    height,
    justifyContent: 'center',
  },
});
