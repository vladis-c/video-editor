import {createSlice} from '@reduxjs/toolkit';
import * as ImagePicker from 'expo-image-picker';

import createAppAsyncThunk from '../thunk';
import {getFileInfoAsync, pickFromGalleryAsync} from '../../helpers/files';
import type {MediaFile} from '../../types';
import {ffmpegCompressVideo} from '../../helpers/ffmpeg';

type CompressSliceInitialState = {
  file: MediaFile;
};

const initialState: CompressSliceInitialState = {
  file: {} as MediaFile,
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
    builder.addCase(getVideo.fulfilled, (state, action) => {
      if (action.payload) {
        state.file = action.payload;
      }
    });
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
    const finished = await ffmpegCompressVideo(fileData.uri);
    if (!finished) {
      return;
    }
    const finalFileData: MediaFile = {
      ...fileFromGallery,
      ...fileData,
    };
    console.log(finalFileData);
    return finalFileData;
  } catch (error) {
    console.log('getVideo error', error);
  }
});

const comressVideo = createAppAsyncThunk('comressVideo', () => {});

export default compressSlice;
