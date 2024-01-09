import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export const getFileInfoAsync = async (path: string) => {
  try {
    const file = await FileSystem.getInfoAsync(path);
    return file;
  } catch (error) {
    console.log('getFileInfoAsync error', error);
    return;
  }
};

export const pickFromGalleryAsync = async (
  mediaTypes: ImagePicker.MediaTypeOptions,
) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      quality: 1,
    });
    if (result.canceled) {
      return;
    }
    return result.assets[0];
  } catch (error) {
    console.log('pickFromGalleryAsync error', error);
    return;
  }
};

export const generateFileName = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const fileName = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  return fileName;
};
