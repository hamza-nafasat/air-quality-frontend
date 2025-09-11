import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';

const subscriptionsApis = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/subscription`,
    credentials: 'include',
  }),
  tagTypes: ['Subscription'],

  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),

    // Get current user's subscription - properly implemented
    getCurrentSubscription: builder.query({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
      transformResponse: (response) => {
        // Handle both successful response and no subscription cases
        if (response && response.success && response.data) {
          return {
            success: true,
            data: response.data,
          };
        }

        // If no subscription found or error, return null data
        return {
          success: response?.success || false,
          data: null,
          message: response?.message || 'No subscription found',
        };
      },
    }),

    // Get user subscription by ID (admin functionality)
    getUserSubscription: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
      providesTags: (result, error, userId) => [{ type: 'Subscription', id: userId }],
    }),

    // Create subscription session
    createSubscriptionSession: builder.mutation({
      query: (planData) => ({
        url: '/create-session',
        method: 'POST',
        body: planData,
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Cancel subscription
    cancelSubscription: builder.mutation({
      query: ({ subscriptionId, cancelAtPeriodEnd = true }) => ({
        url: `/cancel?subscriptionId=${subscriptionId}`,
        method: 'POST',
        body: { cancelAtPeriodEnd },
      }),
      invalidatesTags: ['Subscription'],
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return {
          message: response?.data?.message || 'Failed to cancel subscription',
          status: response?.status,
        };
      },
    }),

    // Resume subscription (for scheduled cancellations)
    resumeSubscription: builder.mutation({
      query: ({ subscriptionId }) => ({
        url: '/resume',
        method: 'POST',
        body: { subscriptionId },
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Get subscription history
    getSubscriptionHistory: builder.query({
      query: () => ({
        url: '/history',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),

    // Update subscription (change plan)
    updateSubscription: builder.mutation({
      query: ({ subscriptionId, newPlanType }) => ({
        url: '/update',
        method: 'PUT',
        body: { subscriptionId, newPlanType },
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Check subscription status
    checkSubscriptionStatus: builder.query({
      query: () => ({
        url: '/status',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),

    getUserSubscriptionHistory: builder.query({
      query: (userId) => ({
        url: `/history/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetCurrentSubscriptionQuery,
  useGetUserSubscriptionQuery,
  useCreateSubscriptionSessionMutation,
  useCancelSubscriptionMutation,
  useResumeSubscriptionMutation,
  useGetSubscriptionHistoryQuery,
  useUpdateSubscriptionMutation,
  useCheckSubscriptionStatusQuery,
  useGetUserSubscriptionHistoryQuery,
} = subscriptionsApis;

export default subscriptionsApis;
// createSubscriptionSession:
