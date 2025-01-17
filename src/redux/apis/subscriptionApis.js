import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config.js";

const subscriptionsApis = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/subscription`, credentials: "include" }),

  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllSubscriptionsQuery } = subscriptionsApis;
export default subscriptionsApis;
