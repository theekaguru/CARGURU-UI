import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    // Auth endpoints
    registerUser: builder.mutation({
      query: (registerPayload) => ({
        url: "auth/register",
        method: "POST",
        body: registerPayload,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginPayload) => ({
        url: "auth/login",
        method: "POST",
        body: loginPayload,
      }),
    }),

    // CRUD endpoints
    getAllUsers: builder.query({
      query: () => "user",
      providesTags: ["users"],
    }),

    getUserById: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ userId, ...userData }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

// Hooks for components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
