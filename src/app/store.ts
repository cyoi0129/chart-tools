import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import UserDataReducer from '../features/UserData';
import ChartDataReducer from '../features/ChartData';
import ChartListReducer from '../features/ChartList'

export const store = configureStore({
  reducer: {
    UserData: UserDataReducer,
    ChartData: ChartDataReducer,
    ChartList: ChartListReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
