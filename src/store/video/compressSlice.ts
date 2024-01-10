import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import createAppAsyncThunk from '../thunk';
import {ffmpegCompressVideo} from '../../helpers/ffmpeg';
import {wait} from '../../helpers/utils';
import navigation, {MAIN_NAV, TABS_NAV} from '../../navigation/navigation';

type CompressionStatus =
  | 'compressing'
  | 'completed'
  | 'error'
  | 'idle'
  | 'forwarding';

type CompressSliceInitialState = {
  status: CompressionStatus;
};

const initialState: CompressSliceInitialState = {
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
});

export const processVideoCompression = createAppAsyncThunk(
  'processVideoCompression',
  async (_, {dispatch, getState}) => {
    const handleNavigateToSelect = () => {
      navigation.navigate(MAIN_NAV.TABS_NAV, {
        screen: TABS_NAV.SELECT,
      });
    };

    const file = getState().videoFile.file;
    if (!file) {
      handleNavigateToSelect();
      return;
    }
    try {
      await wait(1000);
      dispatch(compressSlice.actions.setVideoCompressionStatus('compressing'));
      const finished = await ffmpegCompressVideo(file.uri);
      if (!finished) {
        dispatch(compressSlice.actions.setVideoCompressionStatus('error'));
        await wait(1000);
        handleNavigateToSelect();
        return;
      }
      dispatch(compressSlice.actions.setVideoCompressionStatus('completed'));
      await wait(500);
      dispatch(compressSlice.actions.setVideoCompressionStatus('forwarding'));
      await wait(1000);
      navigation.navigate(MAIN_NAV.TABS_NAV, {screen: TABS_NAV.TRIM});
      return;
    } catch (error) {
      dispatch(compressSlice.actions.setVideoCompressionStatus('error'));
      await wait(1000);
      handleNavigateToSelect();
      console.log('processVideoCompression error', error);
      return;
    }
  },
);

export const {setVideoCompressionStatus, clearVideoCompressSlice} =
  compressSlice.actions;
export default compressSlice;
