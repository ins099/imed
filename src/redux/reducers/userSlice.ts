import {createSlice} from '@reduxjs/toolkit';
import {User} from '../apis/interface.ts';

const initialState: User = {
  id: null,
  email: null,
  password: null,
  mobileNumber: null,
  otp: null,
  name: null,
  surName: null,
  pytroNym: null,
  pin: null,
  dob: null,
  city: null,
  district: null,
  address: null,
  authProvider: null,
  googleId: null,
  notificationEnabled: null,
  accessToken: null,
  accessApp: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      Object.keys(payload).map(key => {
        state[key] = payload[key];
      });
    },
    setAccessToken: (state, {payload}) => {
      state.accessToken = payload;
    },
    setAccessApp: (state, {payload}) => {
      state.accessApp = payload;
    },
  },
});

export const {setUser, setAccessToken, setAccessApp} = userSlice.actions;

export default userSlice.reducer;
