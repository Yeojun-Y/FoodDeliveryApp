import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //동기액션
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {}, //비동기액션
});
export default userSlice;

// action: state를 바꾸는 동작
// dispatch: 액션을 실제로 실행하는 함수
// reducer: 액션이 실제로 실행되면 state로 바꾸는 로직
