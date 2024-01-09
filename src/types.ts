import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export type MediaFile = FileSystem.FileInfo & ImagePicker.ImagePickerAsset;
