import {createSlice} from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import createAppAsyncThunk from '../thunk';
import {getFileInfoAsync, pickFromGalleryAsync} from '../../helpers/files';

type CompressSliceInitialState = {
  file: FileSystem.FileInfo;
};

const initialState: CompressSliceInitialState = {
  file: {} as FileSystem.FileInfo,
};

const compressSlice = createSlice({
  name: 'compressSlice',
  initialState,
  reducers: {
    clearVideoCompressSlice: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(comressVideo.fulfilled, state => {});
  },
});

export const getVideo = createAppAsyncThunk('getVideo', async () => {
  try {
    const fileFromGallery = await pickFromGalleryAsync(
      ImagePicker.MediaTypeOptions.Videos,
    );
    if (!fileFromGallery) {
      return;
    }
    const fileData = await getFileInfoAsync(fileFromGallery.uri);
    if (!fileData?.exists) {
      // TODO: show error toast message
      return;
    }
    console.log(fileData);
  } catch (error) {
    console.log('getVideo error', error);
  }
});

const comressVideo = createAppAsyncThunk('comressVideo', () => {});

export default compressSlice;
