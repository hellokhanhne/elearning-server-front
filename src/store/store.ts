import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthReducer from './reducer/AuthReducer';
import NewsReducer from './reducer/NewsReducer';
import RoleReducer from './reducer/RoleReducer';
import StudentReducer from './reducer/StudentReducer';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: AuthReducer,
      news: NewsReducer,
      student: StudentReducer,
      role: RoleReducer
    },
    devTools: true
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
