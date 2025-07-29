import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://carguruhiresbackend.onrender.com/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['booking'],
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => 'booking',
      providesTags: ['booking'],
    }),

    getBookingById: builder.query({
      query: (bookingId) => `booking/${bookingId}`,
      providesTags: ['booking'],
    }),

        getAllBookingForOneUserById:builder.query({
            query:(userId)=>`booking/user?userId=${userId}`,
            providesTags:['booking'] 
        }),      

    
    createBooking: builder.mutation({
      query: (createBookingPayload) => ({
        url: 'booking',
        method: 'POST',
        body: createBookingPayload,
      }),
      invalidatesTags: ['booking'],
    }),

    updateBooking: builder.mutation({
      query: ({ bookingId, ...bookingDataPayLoad }) => ({
        url: `booking/${bookingId}`,
        method: 'PUT',
        body: bookingDataPayLoad,
      }),
      invalidatesTags: ['booking'],
    }),

    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `booking/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['booking'],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
