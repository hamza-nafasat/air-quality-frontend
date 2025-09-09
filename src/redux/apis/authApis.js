import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';
// import { TAGS } from '../tags.js';

const authApis = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: [TAGS.AUTH, TAGS.PROFILE],
  endpoints: (builder) => ({
    // register
    // -------
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.AUTH],
    }),

    // login
    // -----
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.AUTH],
    }),

    // forget password
    // ---------------
    forgetPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/forget-password',
        method: 'POST',
        body: { email },
      }),
    }),
    // reset password
    // ---------------
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    getMyProfileFirstTime: builder.mutation({
      query: () => ({
        url: '/my-profile',
        method: 'GET',
      }),
      providesTags: [TAGS.PROFILE],
    }),

    // get my profile
    // --------------
    getMyProfile: builder.query({
      query: () => ({
        url: '/my-profile',
        method: 'GET',
      }),
      providesTags: [TAGS.PROFILE],
    }),

    // updateMyProfile
    // ---------------
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: '/my-profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAGS.PROFILE],
    }),

    // logout
    // ------
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
      invalidatesTags: [TAGS.AUTH, TAGS.PROFILE],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useLogoutMutation,
  useUpdateMyProfileMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetMyProfileFirstTimeMutation,
} = authApis;
export default authApis;
