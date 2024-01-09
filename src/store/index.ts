import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import serviceSlice from './serviceSlice';

const store = configureStore({
  reducer: combineReducers({
    service: serviceSlice.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false})
      .concat
      // notificationsApi.middleware,
      (),
});

export type RootState = {
  service: ReturnType<typeof serviceSlice.reducer>;
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
