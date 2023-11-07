import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#92339C',
  secondary: '#DA528C',
  secondaryLight: "#C98CCC",
  primaryDark: '#500074',

  green: '#319010',
  lightGreen: '#E6FEF0',

  lime: '#00BA63',
  emerald: '#2BC978',

  red: '#FF4134',
  lightRed: '#FFF1F0',

  purple: '#6B3CE9',
  lightpurple: '#F3EFFF',

  yellow: '#FFC664',
  lightyellow: '#FFF9EC',

  black: '#0A0F40',
  white: '#FFFFFF',

  lightGray: '#FCFBFC',
  gray: '#C1C3C5',
  darkgray: '#C3C6C7',

  background: '#f0f5ff',

  transparent: 'transparent',

  border: '#F0F2F6',

  shadow: {
    shadowOffset: { width: -1, height: 1 },
    shadowColor: '#C1C3C5',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 6,
  padding: 10,
  paddingLayout: 20,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
