import {createSlice} from '@reduxjs/toolkit';

interface IServiceSlice {
  serviceStep: 0 | 1 | 2 | null;
  address: null | string;
  service: {
    id: number;
    name: string;
    iconUrl?: string;
  };
  category: null | {
    id: number;
    name: string;
    iconUrl?: string;
  };
  subCategory: null | {
    id: number;
    name: string;
    iconUrl?: string;
  };
  medical: null | {
    id: number;
    name: string;
    iconUrl?: string;
  };
}

const initialState: IServiceSlice = {
  serviceStep: null,
  service: {id: 2, name: 'LAB_ANALYSIS', iconUrl: ''},
  category: null,
  subCategory: null,
  medical: null,
  address: null,
};

const serviceOrderSlices = createSlice({
  name: 'servicesOrder',
  initialState,
  reducers: {
    setService: (state, {payload}) => {
      state.service = payload;
    },
    setServiceStep: (state, {payload}) => {
      state.serviceStep = payload;
    },
    setCategory: (state, {payload}) => {
      state.category = payload;
    },
    setSubCategory: (state, {payload}) => {
      state.subCategory = payload;
    },
    setMedical: (state, {payload}) => {
      state.medical = payload;
    },
    setAddress: (state, {payload}) => {
      state.address = payload;
    },
  },
});

export const {
  setService,
  setCategory,
  setMedical,
  setSubCategory,
  setAddress,
  setServiceStep,
} = serviceOrderSlices.actions;

export default serviceOrderSlices.reducer;
