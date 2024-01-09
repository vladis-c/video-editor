import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ServiceSliceInitialState = {
  network: boolean;
  appId: string;
  deviceId: string;
};

const initialState: ServiceSliceInitialState = {
  network: false,
  appId: '',
  deviceId: '',
};

const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<boolean>) => {
      state.network = action.payload;
    },
    setAppId: (state, action: PayloadAction<string>) => {
      state.appId = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
  },
});

export const {setNetwork, setAppId, setDeviceId} = serviceSlice.actions;
export default serviceSlice;
