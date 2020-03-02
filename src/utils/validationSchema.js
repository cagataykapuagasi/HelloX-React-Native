import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required('Lütfen E-posta adresinizi yazın.')
    .email('E-posta adresi doğru değil.'),
  username: Yup.string()
    .required('Lütfen kullanıcı adı girin.')
    .min(3, 'Kullanıcı adı 3 karakterden kısa olamaz.'),
  password: Yup.string()
    .required('Lütfen şifrenizi yazın.')
    .min(6, 'Şifre 6 karakterden kısa olamaz.'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler birbiriyle uyuşmuyor.')
    .required('Lütfen şifrenizi tekrar yazın.'),
});

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Lütfen kullanıcı adı girin.')
    .min(3, 'Kullanıcı adı 3 karakterden kısa olamaz.'),
  password: Yup.string()
    .required('Lütfen şifrenizi yazın.')
    .min(6, 'Şifre 6 karakterden kısa olamaz.'),
});

const sendResetCodeSchema = Yup.object().shape({
  emailUsername: Yup.string()
    .required('E-posta yada kullanıcı adı girin')
    .min(3, 'Kullanıcı adı 3 karakterden uzun olmalı'),
});
const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Lütfen şifrenizi yazın.')
    .min(6, 'Şifre 6 karakterden kısa olamaz.'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler birbiriyle uyuşmuyor.')
    .required('Lütfen şifrenizi tekrar yazın.'),
});

export {
  loginSchema,
  registerSchema,
  sendResetCodeSchema,
  changePasswordSchema,
};
