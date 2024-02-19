/**
 * Define base api routes here
 */
const Base = '/api/v1';

/**
 * Export paths
 */
export const PATHS = {
  Auth: {
    Login: `${Base}/auth/login`,
    Logout: `${Base}/auth/logout`,
  },
};
