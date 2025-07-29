import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carguruhiresbackend.onrender.com/api/" }),
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<any[], void>({
      query: () => "users",
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
