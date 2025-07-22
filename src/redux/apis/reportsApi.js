import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
const reportsApi = createApi({
  // reducerPath: 'floorApi',
  reducerPath: 'reportsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/report`,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getReports: builder.query({
      query: (params) => ({
        url: `/all`,
        method: 'GET',
        params,
      }),
      //   providesTags: ['floor'],
    }),
  }),
});

export const { useGetReportsQuery, useLazyGetReportsQuery } = reportsApi;
export default reportsApi;
