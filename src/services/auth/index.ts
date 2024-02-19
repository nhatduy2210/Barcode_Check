import { api } from '../api';

import { PATHS } from '@/constants/paths';
import { BaseResponse } from '@/models';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: { email: string; password: string }) => {
        return {
          url: PATHS.Auth.Login,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };
      },
      transformResponse: (response: BaseResponse<any>) => response,
    }),
    logout: build.mutation({
      query: () => {
        return {
          url: PATHS.Auth.Logout,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        };
      },
      transformResponse: (response: BaseResponse<any>) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = authApi;
