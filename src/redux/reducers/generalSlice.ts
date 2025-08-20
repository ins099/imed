import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLanguage: (state, {payload}) => {
      state.language = payload || 'en';
    },
  },
});

export const {setLanguage} = generalSlice.actions;

export default generalSlice.reducer;
