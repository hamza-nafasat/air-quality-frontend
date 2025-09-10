import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';
import { userNotExist } from '../slices/authSlice.js';
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

    // create user
    CreateUser: builder.mutation({
      query: (data) => ({
        url: '/create-user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.USER],
    }),

    // ✅ get all users by creatorId
    getUsersByCreator: builder.query({
      query: () => ({
        url: '/get-user',
        method: 'GET',
      }),
      providesTags: [TAGS.USER],
    }),
    //update user
    updateUser: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/update-user/${userId}`, // matches UpdateUser controller (req.params.userId)
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAGS.USER], // invalidate users list
    }),

    // ✅ delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/delete-user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.USER],
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
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     // clear redux user on successful logout
      //     dispatch(userNotExist());
      //     console.log('successsssssss');
      //   } catch (err) {
      //     console.error('Logout failed:', err);
      //   }
      // },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // clear user
          dispatch(userNotExist());

          // clear all API cache
          dispatch(authApis.util.resetApiState());

          console.log('✅ Logout successful, cache cleared');
        } catch (err) {
          console.error('❌ Logout failed:', err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useCreateUserMutation,
  useGetUsersByCreatorQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useLogoutMutation,
  useUpdateMyProfileMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetMyProfileFirstTimeMutation,
} = authApis;
export default authApis;
