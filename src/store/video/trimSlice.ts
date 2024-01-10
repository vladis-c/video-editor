import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {MediaFile} from '../../types';

type VideoValues = {
  start: number;
  end: number;
  current: number;
  duration: number;
};

type TrimSliceInitialState = {
  file: MediaFile;
  values: VideoValues;
};

const initialState: TrimSliceInitialState = {
  file: {} as MediaFile,
  values: {start: 0, end: 0, current: 0, duration: 0},
};

const trimSlice = createSlice({
  name: 'trimSlice',
  initialState,
  reducers: {
    setCurrentVideoTrimPlayback: (state, action: PayloadAction<number>) => {
      state.values.current = action.payload;
    },
    setVideoTrimValues: (
      state,
      action: PayloadAction<Partial<VideoValues>>,
    ) => {
      state.values = {...state.values, ...action.payload};
    },
    clearVideoTrimSlice: () => initialState,
  },
  extraReducers: builder => {},
});

export const {
  setVideoTrimValues,
  setCurrentVideoTrimPlayback,
  clearVideoTrimSlice,
} = trimSlice.actions;
export default trimSlice;
