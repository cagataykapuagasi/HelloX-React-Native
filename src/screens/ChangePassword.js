import React from 'react';
import { View } from 'react-native';
import { languages, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Button } from '~/components';
import { User } from '../api';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { changePasswordSchema } from '~/utils/validationSchema';
import { showMessage } from 'react-native-flash-message';

const { change_password } = languages.t('alerts');
const {
  labels: { password, new_password, new_password_confirmation },
  button,
} = languages.t('change_password');

const initialValues = {
  password: '',
  new_password: '',
  new_password_confirmation: '',
};

const ChangePassword = props => {
  const change = ({ new_password_confirmation, ...form }, { setErrors, setSubmitting }) => {
    User.updatePassword(form)
      .then(({ message }) => {
        showMessage({
          message: change_password,
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
    <Container vertical={50} colors={colors.auth} style={styles.container}>
      <View style={styles.textContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={change}
          validationSchema={changePasswordSchema}>
          {({ handleSubmit, isSubmitting, isValid }) => (
            <Form style={styles.forms}>
              <TextInput name="password" label={password} />
              <TextInput name="new_password" label={new_password} />
              <TextInput name="new_password_confirmation" label={new_password_confirmation} />

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

export default ChangePassword;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
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
