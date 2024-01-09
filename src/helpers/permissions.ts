import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export const getMediaLibraryPermissions = async () => {
  try {
    const permissionsToGet = [
      ImagePicker.getMediaLibraryPermissionsAsync(),
      MediaLibrary.getPermissionsAsync(),
    ];
    const permissionsToGetResult = await Promise.all(permissionsToGet);
    if (permissionsToGetResult.every(x => x.granted)) {
      return true;
    }
    const permissionsToRequest = [
      ImagePicker.requestMediaLibraryPermissionsAsync(),
      MediaLibrary.requestPermissionsAsync(),
    ];
    const permissionsToRequestResult = await Promise.all(permissionsToRequest);
    if (permissionsToRequestResult.every(x => x.granted)) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('getMediaLibraryPermissions error', error);
    return false;
  }
};
