import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Button } from '~/components';
import { User } from '../api';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { changePasswordSchema } from '~/utils/validationSchema';
import { showMessage } from 'react-native-flash-message';

const initialValues = {
  password: '',
  new_password: '',
  new_password_confirmation: '',
};

const Login = props => {
  const change = (
    { new_password_confirmation, ...form },
    { setErrors, setSubmitting }
  ) => {
    User.updatePassword(form)
      .then(({ message }) => {
        showMessage({
          message,
          type: 'success',
        });
        Actions.pop();
      })
      .catch(({ error }) => {
        setErrors(error);
        setSubmitting(false);
      });
  };

  return (
    <Container colors={colors.auth} style={styles.container}>
      <View style={styles.textContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={change}
          validationSchema={changePasswordSchema}>
          {({ handleSubmit, isSubmitting, isValid }) => (
            <Form style={styles.forms}>
              <TextInput name="password" label="password" />
              <TextInput name="new_password" label="new password" />
              <TextInput
                name="new_password_confirmation"
                label="new password again"
              />

              <Button
                horizontal
                colors={colors.button}
                text="Change"
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
});
