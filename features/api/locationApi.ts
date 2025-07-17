import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const locationApi = createApi({
  reducerPath: 'locationApi',
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
  tagTypes: ['location'],
  endpoints: (builder) => ({
    getAllLocations: builder.query({
      query: () => 'location',
      providesTags: ['location'],
    }),

    getLocationById: builder.query({
      query: (locationId) => `location/${locationId}`,
      providesTags: ['location'],
    }),

    createLocation: builder.mutation({
      query: (newLocation) => ({
        url: 'location',
        method: 'POST',
        body: newLocation,
      }),
      invalidatesTags: ['location'],
    }),

    updateLocation: builder.mutation({
      query: ({ locationId, ...locationData }) => ({
        url: `location/${locationId}`,
        method: 'PUT',
        body: locationData,
      }),
      invalidatesTags: ['location'],
    }),

    deleteLocation: builder.mutation({
      query: (locationId) => ({
        url: `location/${locationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['location'],
    }),
  }),
});

export const {
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
