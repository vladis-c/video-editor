import {MD3LightTheme as PaperDefaultTheme} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {DefaultTheme} from '@react-navigation/native';
import {Theme} from '@react-navigation/native';

export const fonts = {
  BigHeading: {
    fontFamily: 'Lato_700Bold',
    fontSize: 30,
  },
  SmallHeading: {
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
  },
  HugeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 144,
  },
  BigText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 72,
  },
  BasicText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
  SmallText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
  },
  SmallLightText: {
    fontFamily: 'Lato_300Light',
    fontWeight: '300' as any,
    fontSize: 11,
  },
};

export const PaperTheme: ThemeProp = {
  ...PaperDefaultTheme,
  fonts: {
    bodyLarge: fonts.HugeText,
    bodyMedium: fonts.BigText,
    bodySmall: fonts.BasicText,
    default: fonts.BasicText,
    displayLarge: fonts.BigHeading,
    displayMedium: fonts.SmallHeading,
    displaySmall: fonts.BasicText,
    headlineLarge: fonts.BigHeading,
    headlineMedium: fonts.SmallHeading,
    headlineSmall: fonts.SmallText,
    titleLarge: fonts.BigHeading,
    titleMedium: fonts.SmallHeading,
    titleSmall: fonts.SmallText,
    labelLarge: fonts.SmallHeading,
    labelMedium: fonts.BasicText,
    labelSmall: fonts.SmallText,
  },
  dark: false,
  colors: {
    primary: '#212529',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(176, 236, 255)',
    onPrimaryContainer: 'rgb(0, 31, 39)',
    secondary: 'rgb(0, 100, 149)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(203, 230, 255)',
    onSecondaryContainer: 'rgb(0, 30, 48)',
    tertiary: 'rgb(0, 101, 144)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(200, 230, 255)',
    onTertiaryContainer: 'rgb(0, 30, 46)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(251, 252, 254)',
    onBackground: 'rgb(25, 28, 29)',
    surface: 'rgb(251, 252, 254)',
    onSurface: 'rgb(25, 28, 29)',
    surfaceVariant: 'rgb(219, 228, 231)',
    onSurfaceVariant: 'rgb(64, 72, 75)',
    outline: 'rgb(112, 120, 124)',
    outlineVariant: 'rgb(191, 200, 203)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(46, 49, 50)',
    inverseOnSurface: 'rgb(239, 241, 242)',
    inversePrimary: 'rgb(87, 214, 246)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 245, 247)',
      level2: 'rgb(231, 240, 244)',
      level3: 'rgb(223, 236, 240)',
      level4: 'rgb(221, 234, 238)',
      level5: 'rgb(216, 231, 236)',
    },
    surfaceDisabled: 'rgba(25, 28, 29, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 29, 0.38)',
    backdrop: 'rgba(41, 50, 53, 0.4)',
  },
};

export const BaseTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#495057',
    background: '#faf5e6',
    text: '#f8f9fa',
    card: '#212529',
    border: '#dee2e6',
    notification: 'rgb(186, 26, 26)',
  },
};
