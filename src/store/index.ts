import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import serviceSlice from './serviceSlice';
import compressSlice from './video/compressSlice';
import trimSlice from './video/trimSlice';
import videoFileSlice from './video/fileSlice';

const store = configureStore({
  reducer: combineReducers({
    service: serviceSlice.reducer,
    videoFile: videoFileSlice.reducer,
    compressVideo: compressSlice.reducer,
    trimVideo: trimSlice.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(),
});

export type RootState = {
  service: ReturnType<typeof serviceSlice.reducer>;
  videoFile: ReturnType<typeof videoFileSlice.reducer>;
  compressVideo: ReturnType<typeof compressSlice.reducer>;
  trimVideo: ReturnType<typeof trimSlice.reducer>;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type Dispatcher = typeof store.dispatch;
export type Selector<S> = (state: RootState) => S;

export const useAppDispatch = (): Dispatcher => useDispatch<Dispatcher>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
