/**
 * Projede kullanılan bütün renkler burada tanımlanmalı ve bu dosyadan import edilmelidir.
 * Gereksiz tanımlamalardan uzak durulmalı.
 *
 * Örneğin: splashBackground, mainBackground gibi tanımlanmamalıdır.
 * Bazı istisnai durumlar dışında aynı renkler mümkün mertebe ortak gruplanmalıdır.
 *
 * Bunun yerine:
 *   Ana Renkler       : primary, secondary, light, dark, muted
 *   Durum Renkleri    : danger, success, info, warning
 *   İstisnai Durumlar : shadow, card
 *
 *
 * Renk kodununun ismini bulan site:
 *   https://www.color-blindness.com/color-name-hue/
 *
 *
 * Örnek kullanım:
 * import { colors } from 'assets';
 *
 * colors.primary
 */

const colors = {
  primary: '#128C7E',
  primaryHeavy: '#075E54',
  primaryLight: '#159A8B',
  secondary: '#f95a25',
  background: '#fff',
  lightGray: '#a9aeb2',
  secondaryDark: '#747474',
  text: '#777777',
  chatCard: '#DCF8C6',
  chatBackground: '#ECE5DD',
  online: '#25D366',
  offline: 'red',
  button: ['#fc6b3b', '#f96331', '#f95a25'],
  auth: ['#128C7E', '#128C7E', '#075E54'],
  danger: '#cf283a',
  black: '#000000',
};
export default colors;
