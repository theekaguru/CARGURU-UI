import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
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
  tagTypes: ['vehicle'],
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: () => 'vehicle',
      providesTags: ['vehicle'],
    }),

    getVehicleById: builder.query({
      query: (vehicleId) => `vehicle/${vehicleId}`,
      providesTags: ['vehicle'],
    }),

    createVehicle: builder.mutation({
      query: (newVehicle) => ({
        url: 'vehicle',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: ['vehicle'],
    }),
createVehicleUpdated: builder.mutation({
      query: (newVehicle) => ({
        url: 'vehicle',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: ['vehicle'],
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicleId, ...vehicleData }) => ({
        url: `vehicle/${vehicleId}`,
        method: 'PUT',
        body: vehicleData,
      }),
      invalidatesTags: ['vehicle'],
    }),

    deleteVehicle: builder.mutation({
      query: (vehicleId) => ({
        url: `vehicle/${vehicleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vehicle'],
    }),
  }),
});

export const {
  useGetAllVehiclesQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useCreateVehicleUpdatedMutation,
} = vehicleApi;
