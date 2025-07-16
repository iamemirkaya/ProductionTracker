
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../../app/models/authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['auths'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'api/Auth/Login/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (userInfo) => ({
        url: 'api/Auth/Register/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'Auth/Logout/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useLogoutMutation } = authApi;