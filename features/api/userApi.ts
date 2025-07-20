import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["users", "user"], // updated here
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

    // Basic CRUD
    getAllUsers: builder.query({
      query: () => "user",
      providesTags: ["users"],
    }),

    getUserById: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["users"],
    }),

updateUser: builder.mutation({
  query: ({ userId, ...userData }) => {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return {
      url: `users/${userId}`,
      method: "PUT",
      body: formData,
    };
  },
  invalidatesTags: ["users", "user"],
}),


    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    // Extended profile management
    getAllUsersProfiles: builder.query({
      query: () => "users",
      providesTags: ["users"],
    }),

    getUserProfile: builder.query({
      query: (userId: number) => `users/${userId}`,
      providesTags: ["user"],
    }),

    deleteUserProfile: builder.mutation({
      query: (user_id: number) => ({
        url: `users/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user", "users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useGetAllUsersProfilesQuery,
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
} = userApi;
