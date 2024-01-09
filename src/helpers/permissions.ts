import * as ImagePicker from 'expo-image-picker';

export const getMediaLibraryPermissions = async () => {
  try {
    const permissionGotten =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (permissionGotten.granted) {
      return true;
    }
    const permitted = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permitted.granted) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('getMediaLibraryPermissions error', error);
    return false;
  }
};
