import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import * as ImagePicker from 'expo-image-picker';

import createAppAsyncThunk from '../thunk';
import {getFileInfoAsync, pickFromGalleryAsync} from '../../helpers/files';
import type {MediaFile} from '../../types';
import {ffmpegCompressVideo} from '../../helpers/ffmpeg';
import {wait} from '../../helpers/utils';

type CompressionStatus =
  | 'getting info'
  | 'compressing'
  | 'completed'
  | 'no file'
  | 'error'
  | 'idle';

type CompressSliceInitialState = {
  file: MediaFile;
  status: CompressionStatus;
};

const initialState: CompressSliceInitialState = {
  file: {} as MediaFile,
  status: 'idle',
};

const compressSlice = createSlice({
  name: 'compressSlice',
  initialState,
  reducers: {
    setVideoCompressionStatus: (
      state,
      action: PayloadAction<CompressionStatus>,
    ) => {
      state.status = action.payload;
    },
    clearVideoCompressSlice: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(processVideoCompression.fulfilled, (state, action) => {
      if (action.payload) {
        state.file = action.payload;
      }
    });
  },
});

export const processVideoCompression = createAppAsyncThunk(
  'getVideo',
  async (_, {dispatch}) => {
    try {
      const fileFromGallery = await pickFromGalleryAsync(
        ImagePicker.MediaTypeOptions.Videos,
      );
      if (!fileFromGallery) {
        dispatch(compressSlice.actions.setVideoCompressionStatus('no file'));
        return;
      }
      dispatch(compressSlice.actions.setVideoCompressionStatus('getting info'));
      const fileData = await getFileInfoAsync(fileFromGallery.uri);
      if (!fileData?.exists) {
        dispatch(compressSlice.actions.setVideoCompressionStatus('no file'));
        return;
      }
      await wait(1000);
      dispatch(compressSlice.actions.setVideoCompressionStatus('compressing'));
      const finished = await ffmpegCompressVideo(fileData.uri);
      if (!finished) {
        dispatch(compressSlice.actions.setVideoCompressionStatus('error'));
        return;
      }
      const finalFileData: MediaFile = {
        ...fileFromGallery,
        ...fileData,
      };
      dispatch(compressSlice.actions.setVideoCompressionStatus('completed'));
      return finalFileData;
    } catch (error) {
      console.log('getVideo error', error);
      return;
    }
  },
);

export const {setVideoCompressionStatus, clearVideoCompressSlice} =
  compressSlice.actions;
export default compressSlice;
