import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config.js";

const authApis = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/auth`, credentials: "include" }),

  endpoints: (builder) => ({
    // register
    // -------
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    // login
    // -----
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    // forget password
    // ---------------
    forgetPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
    // reset password
    // ---------------
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    getMyProfileFirstTime: builder.mutation({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
    }),

    // get my profile
    // --------------
    getMyProfile: builder.query({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
    }),

    // updateMyProfile
    // ---------------
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/my-profile",
        method: "PUT",
        body: data,
      }),
    }),

    // logout
    // ------
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
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
