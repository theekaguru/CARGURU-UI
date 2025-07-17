import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const vehicleSpecApi = createApi({
  reducerPath: 'vehicleSpecApi',
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
  tagTypes: ['vehicleSpec'],
  endpoints: (builder) => ({
    getAllVehicleSpecifications: builder.query({
      query: () => 'vehicleSpec',
      providesTags: ['vehicleSpec'],
    }),

    getVehicleSpecificationById: builder.query({
      query: (vehicleSpecId) => `vehicleSpec/${vehicleSpecId}`,
      providesTags: ['vehicleSpec'],
    }),

    createVehicleSpecification: builder.mutation({
      query: (newVehicleSpec) => ({
        url: 'vehicleSpec',
        method: 'POST',
        body: newVehicleSpec,
      }),
      invalidatesTags: ['vehicleSpec'],
    }),

    updateVehicleSpecification: builder.mutation({
      query: ({ vehicleSpecId, ...vehicleSpecData }) => ({
        url: `vehicleSpec/${vehicleSpecId}`,
        method: 'PUT',
        body: vehicleSpecData,
      }),
      invalidatesTags: ['vehicleSpec'],
    }),

    deleteVehicleSpecification: builder.mutation({
      query: (vehicleSpecId) => ({
        url: `vehicleSpec/${vehicleSpecId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vehicleSpec'],
    }),
  }),
});

export const {
  useGetAllVehicleSpecificationsQuery,
  useGetVehicleSpecificationByIdQuery,
  useCreateVehicleSpecificationMutation,
  useUpdateVehicleSpecificationMutation,
  useDeleteVehicleSpecificationMutation,
} = vehicleSpecApi;
