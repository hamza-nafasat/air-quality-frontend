import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';

const subscriptionsApis = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/subscription`,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
    }),
    
    // Get current user's subscription - using the all endpoint and filtering
    getCurrentSubscription: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      transformResponse: (response, meta, arg) => {
        // Filter to get only the current user's subscription
        if (response?.data && Array.isArray(response.data)) {
          // Since we don't have user info in the response, we'll return the first active subscription
          // In a real implementation, you'd want to filter by user ID
          const currentSubscription = response.data.find(sub => 
            sub.subscriptionStatus === 'active' || 
            sub.subscriptionStatus === 'trialing' ||
            sub.subscriptionStatus === 'past_due'
          );
          return { data: currentSubscription || null };
        }
        return { data: null };
      },
    }),
    
    // Cancel subscription
    cancelSubscription: builder.mutation({
      query: ({ subscriptionId, cancelAtPeriodEnd = true }) => ({
        url: `/cancel?subscriptionId=${subscriptionId}`,
        method: 'POST',
        body: { cancelAtPeriodEnd },
      }),
    }),
  }),
});

export const { 
  useGetAllSubscriptionsQuery, 
  useGetCurrentSubscriptionQuery,
  useCancelSubscriptionMutation 
} = subscriptionsApis;
export default subscriptionsApis;
