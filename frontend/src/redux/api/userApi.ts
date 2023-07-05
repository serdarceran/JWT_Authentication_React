import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import customFetchBase from "./customFetchBase";
import { IUser } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    getAllUsers: builder.query<IUser[], void>({
      query() {
        return {
          url: `/users`,
          credentials: 'include',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Users' as const,
                id,
              })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
      transformResponse: (results: { data: { users: IUser[] } }) =>
        results.data.users,
    })
  }),
});

export const {
  useGetAllUsersQuery,
} = userApi;