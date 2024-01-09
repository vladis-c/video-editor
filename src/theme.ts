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
    primary: 'rgb(103, 96, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(242, 230, 106)',
    onPrimaryContainer: 'rgb(31, 28, 0)',
    secondary: 'rgb(121, 89, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 223, 159)',
    onSecondaryContainer: 'rgb(38, 26, 0)',
    tertiary: 'rgb(90, 83, 168)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(228, 223, 255)',
    onTertiaryContainer: 'rgb(21, 3, 98)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(29, 28, 22)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(29, 28, 22)',
    surfaceVariant: 'rgb(231, 227, 208)',
    onSurfaceVariant: 'rgb(73, 71, 58)',
    outline: 'rgb(122, 119, 104)',
    outlineVariant: 'rgb(203, 199, 181)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(50, 48, 43)',
    inverseOnSurface: 'rgb(245, 240, 231)',
    inversePrimary: 'rgb(213, 201, 81)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 243, 242)',
      level2: 'rgb(243, 239, 235)',
      level3: 'rgb(238, 234, 227)',
      level4: 'rgb(237, 232, 224)',
      level5: 'rgb(234, 229, 219)',
    },
    surfaceDisabled: 'rgba(29, 28, 22, 0.12)',
    onSurfaceDisabled: 'rgba(29, 28, 22, 0.38)',
    backdrop: 'rgba(50, 49, 36, 0.4)',
    //@ts-ignore
    forth: 'rgb(191, 0, 49)',
    onForth: 'rgb(255, 255, 255)',
    forthContainer: 'rgb(255, 218, 217)',
    onForthContainer: 'rgb(64, 0, 10)',
  },
};

export const BaseTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2d2c2e',
    background: '#faf5e6',
    text: 'rgb(0, 0, 0)',
    card: '#FBBD0D',
    border: '#2d2c2e',
    notification: '#fd1f4a',
  },
};
