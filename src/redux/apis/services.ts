import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './baseQuery';

export const servicesApis = createApi({
  reducerPath: 'servicesApis',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({
    getServices: builder.query({
      query: params => ({
        url: 'service',
        method: 'GET',
        params,
      }),
    }),
    getCategoriesByService: builder.query({
      query: params => ({
        url: 'category',
        method: 'GET',
        params,
      }),
    }),
    getSubCategoriesByCatId: builder.query({
      query: params => ({
        url: 'subcategory',
        method: 'GET',
        params,
      }),
    }),
    getMedical: builder.query({
      query: params => ({
        url: 'medical',
        method: 'GET',
        params,
      }),
    }),
    getMedicalDays: builder.query({
      query: params => ({
        url: 'availability/days',
        method: 'GET',
        params,
      }),
    }),
    getMedicalTimeSlots: builder.query({
      query: params => ({
        url: 'availability/time-slots',
        method: 'GET',
        params,
      }),
    }),
    createOrder: builder.mutation({
      query: body => ({
        url: 'order',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetCategoriesByServiceQuery,
  useLazyGetMedicalQuery,
  useLazyGetSubCategoriesByCatIdQuery,
  useGetMedicalDaysQuery,
  useLazyGetMedicalTimeSlotsQuery,
  useCreateOrderMutation,
} = servicesApis;
