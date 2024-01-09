import {
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from '@expo-google-fonts/lato';
import {useEffect, useState} from 'react';
import {getMediaLibraryPermissions} from '../helpers/permissions';

export const usePrefetch = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && permissionsGranted) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, permissionsGranted]);

  useEffect(() => {
    (async () => {
      const res = await getMediaLibraryPermissions();
      setPermissionsGranted(res);
    })();
  }, []);

  return {appIsReady};
};
