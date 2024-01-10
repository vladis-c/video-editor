import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as ScreenOrientation from 'expo-screen-orientation';

type OrientationService = {
  current: ScreenOrientation.Orientation;
  change: number;
  width: number;
};
type ServiceSliceInitialState = {
  orientation: OrientationService;
};

const initialState: ServiceSliceInitialState = {
  orientation: {} as OrientationService,
};

const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {
    setDeviceOrientationValues: (
      state,
      action: PayloadAction<Partial<OrientationService>>,
    ) => {
      state.orientation = {...state.orientation, ...action.payload};
    },
  },
});

export const {setDeviceOrientationValues} = serviceSlice.actions;
export default serviceSlice;
