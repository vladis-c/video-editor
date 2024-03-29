import React, {useCallback} from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

import store from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import navigation from './src/navigation/navigation';
import {BaseTheme, PaperTheme} from './src/theme';
import {usePrefetch} from './src/hooks/usePrefetch';

LogBox.ignoreLogs(['`new NativeEventEmitter()`']);

SplashScreen.preventAutoHideAsync();

const App = () => {
  const {appIsReady} = usePrefetch();

  const hideSplashScreen = useCallback(async () => {
    try {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    } catch (error) {
      console.log('Error when hiding splash,', error);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={hideSplashScreen}>
      <Provider store={store}>
        <PaperProvider theme={PaperTheme}>
          <NavigationContainer theme={BaseTheme} ref={navigation.navigationRef}>
            <StatusBar translucent={true} />
            <MainNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
