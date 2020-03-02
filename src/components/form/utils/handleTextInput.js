import { compose, withProps } from 'recompose';
import { connect } from 'formik';
import { withNextInputAutoFocusInput, withFormikControl } from 'react-native-formik';
import withInputTypeProps from './withInputTypeProps';

const handleTextInput = compose(
  withFormikControl,
  withInputTypeProps,
  connect,
  withProps(
    ({
      formik: { isSubmitting },
      name,
      setFieldValue,
      setFieldTouched,
      onChangeText,
      onBlur,
      onFocus,
    }) => ({
      onChangeText: text => {
        setFieldValue(text);
        if (onChangeText) {
          onChangeText(text);
        }
      },
      onBlur: () => {
        // validate onBlur only while not submitting
        // this prevents validating twice in succession when clicking 'done' on keyboard - first onSubmitEditing, then onBlur
        setFieldTouched(true, !isSubmitting);
        if (onBlur) {
          onBlur();
        }
      },
      onFocus: () => {
        if (onFocus) {
          onFocus(name);
        }
      },
    })
  ),
  withNextInputAutoFocusInput
);

export default handleTextInput;
