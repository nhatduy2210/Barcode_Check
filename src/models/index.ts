/**
 * Define type of model
 */

export type BaseResponse<T> = {
  status: boolean;
  message: string;
  data?: T;
  error?: any;
};

export type AuthState = {
  isAuth: boolean;
  access_token: string | null;
  refresh_token: string | null;
};
