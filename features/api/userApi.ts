import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['users'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['users'],
    }),

    getAllUsers: builder.query({
      query: () => 'users',
      providesTags: ['users'],
    }),

    getUserById: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ['users'],
    }),

    updateUser: builder.mutation({
      query: ({ userId, ...userData }) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['users'],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
