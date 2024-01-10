import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import * as ImagePicker from 'expo-image-picker';

import type {MediaFile} from '../../types';
import createAppAsyncThunk from '../thunk';
import {getFileInfoAsync, pickFromGalleryAsync} from '../../helpers/files';
import {wait} from '../../helpers/utils';
import navigation, {MAIN_NAV, TABS_NAV} from '../../navigation/navigation';

type VideoFileStatus =
  | 'getting info'
  | 'forwarding'
  | 'no file'
  | 'error'
  | 'idle';

type VideoFileSliceInitialState = {
  file: MediaFile | null;
  status: VideoFileStatus;
};

const initialState: VideoFileSliceInitialState = {
  file: null,
  status: 'idle',
};

const videoFileSlice = createSlice({
  name: 'videoFileSlice',
  initialState,
  reducers: {
    setVideoFileStatus: (state, action: PayloadAction<VideoFileStatus>) => {
      state.status = action.payload;
    },
    clearVideoFileSlice: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(selectVideoFile.fulfilled, (state, action) => {
      if (action.payload) {
        state.file = action.payload;
      }
    });
  },
});

export const selectVideoFile = createAppAsyncThunk(
  'selectVideoFile',
  async (_, {dispatch}) => {
    try {
      const fileFromGallery = await pickFromGalleryAsync(
        ImagePicker.MediaTypeOptions.Videos,
      );
      if (!fileFromGallery) {
        dispatch(videoFileSlice.actions.setVideoFileStatus('error'));
        return;
      }
      dispatch(videoFileSlice.actions.setVideoFileStatus('getting info'));
      const fileData = await getFileInfoAsync(fileFromGallery.uri);
      if (!fileData?.exists) {
        dispatch(videoFileSlice.actions.setVideoFileStatus('error'));
        return;
      }
      dispatch(videoFileSlice.actions.setVideoFileStatus('forwarding'));
      await wait(1000);
      const finalFileData: MediaFile = {
        ...fileData,
        ...fileFromGallery,
      };
      navigation.navigate(MAIN_NAV.TABS_NAV, {screen: TABS_NAV.COMPRESS});
      return finalFileData;
    } catch (error) {
      dispatch(videoFileSlice.actions.setVideoFileStatus('error'));
      console.log('getVideo error', error);
      return;
    }
  },
);

export const {clearVideoFileSlice} = videoFileSlice.actions;
export default videoFileSlice;
