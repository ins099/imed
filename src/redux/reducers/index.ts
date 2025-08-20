import {combineReducers} from '@reduxjs/toolkit';
import {authApis} from '../apis/auth';
import generalSlice from './generalSlice';
import userSlice from './userSlice';
import serviceOrderSlices from './serviceSlice';
import {servicesApis} from '../apis/services';

export const allReducers = combineReducers({
  generalSlice,
  serviceOrderSlices,
  userSlice,
  [authApis.reducerPath]: authApis.reducer,
  [servicesApis.reducerPath]: servicesApis.reducer,
});
