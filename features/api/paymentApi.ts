import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['payment'],
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => 'payment',
      providesTags: ['payment'],
    }),

    getPaymentById: builder.query({
      query: (paymentId) => `payment/${paymentId}`,
      providesTags: ['payment'],
    }),

    createPayment: builder.mutation({
      query: (newPayment) => ({
        url: 'payment',
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: ['payment'],
    }),

        getAllPaymentForUserById:builder.query({
            query:(userId)=>`payment/user?userId=${userId}`,
            providesTags:['payment']
        }),    

    updatePayment: builder.mutation({
      query: ({ paymentId, ...paymentDataPayload }) => ({
        url: `payment/${paymentId}`,
        method: 'PUT',
        body: paymentDataPayload,
      }),
      invalidatesTags: ['payment'],
    }),

    deletePayment: builder.mutation({
      query: (paymentId) => ({
        url: `payment/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['payment'],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
