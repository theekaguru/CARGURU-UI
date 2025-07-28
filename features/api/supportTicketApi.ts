import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const supportTicketApi = createApi({
  reducerPath: 'supportTicketApi',
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
  tagTypes: ['supportTicket'],
  endpoints: (builder) => ({
    getAllSupportTickets: builder.query({
      query: () => 'supportTicket',
      providesTags: ['supportTicket'],
    }),

    getSupportTicketById: builder.query({
      query: (ticketId) => `supportTicket/${ticketId}`,
      providesTags: ['supportTicket'],
    }),

    createSupportTicket: builder.mutation({
      query: (newTicket) => ({
        url: 'supportTicket',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['supportTicket'],
    }),

    updateSupportTicket: builder.mutation({
      query: ({ ticketId, ...ticketData }) => ({
        url: `supportTicket/${ticketId}`,
        method: 'PUT',
        body: ticketData,
      }),
      invalidatesTags: ['supportTicket'],
    }),

    deleteSupportTicket: builder.mutation({
      query: (ticketId) => ({
        url: `supportTicket/${ticketId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['supportTicket'],
    }),
  }),
});

export const {
  useGetAllSupportTicketsQuery,
  useGetSupportTicketByIdQuery,
  useCreateSupportTicketMutation,
  useUpdateSupportTicketMutation,
  useDeleteSupportTicketMutation,
} = supportTicketApi;
