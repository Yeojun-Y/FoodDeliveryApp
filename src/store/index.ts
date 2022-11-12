import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './reducer';

const stroe = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});
export default stroe;

export type AppDispatch = typeof stroe.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
