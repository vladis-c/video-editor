import {createAsyncThunk} from '@reduxjs/toolkit';
import type {Dispatcher, RootState} from '.';

export default createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: Dispatcher;
}>();
