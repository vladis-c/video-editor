import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export const getMediaLibraryPermissions = async () => {
  try {
    const permissionGotten =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    const permissionGotten2 = await MediaLibrary.requestPermissionsAsync();
    if (permissionGotten.granted && permissionGotten2.granted) {
      return true;
    }
    const permitted = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const permitted2 = await MediaLibrary.requestPermissionsAsync();
    if (permitted.granted && permitted2.granted) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('getMediaLibraryPermissions error', error);
    return false;
  }
};
