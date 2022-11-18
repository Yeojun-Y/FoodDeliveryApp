import {combineReducers} from 'redux';
import orderSlice from '../slices/order';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>; //타입에러안나도록
export default rootReducer;
