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
    logout: builder.query({
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
  useLogoutQuery,
  useUpdateMyProfileMutation,
} = authApis;
export default authApis;
