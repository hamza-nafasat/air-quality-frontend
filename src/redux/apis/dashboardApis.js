import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
const dashboardApis = createApi({
  // reducerPath: 'floorApi',
  reducerPath: 'dashboardApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/admin`,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    adminDashboard: builder.query({
      query: () => ({
        url: `/dashboard`,
        method: 'GET',
      }),
      //   providesTags: ['floor'],
    }),
  }),
});

export const { useAdminDashboardQuery } = dashboardApis;
export default dashboardApis;
