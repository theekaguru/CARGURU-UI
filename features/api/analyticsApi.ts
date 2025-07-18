import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<any[], void>({
      query: () => "user",
      providesTags: ["Analytics"],
    }),
    getAllVehicles: builder.query<any[], void>({
      query: () => "vehicle",
      providesTags: ["Analytics"],
    }),
    getAllBookings: builder.query<any[], void>({
      query: () => "booking",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllVehiclesQuery,
  useGetAllBookingsQuery,
} = analyticsApi;
