import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './baseQuery';

export const authApis = createApi({
  reducerPath: 'authApis',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({
    googleLogin: builder.mutation({
      query: body => ({
        url: 'user/google',
        method: 'POST',
        body,
      }),
    }),
    updateProfile: builder.mutation({
      query: body => ({
        url: 'user/profile',
        method: 'PATCH',
        body,
      }),
    }),
    getMyProfile: builder.query({
      query: params => ({
        url: 'user/profile',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGoogleLoginMutation,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = authApis;
