import authConfig from '~/config/auth';

export const isAuthenticated = () =>
  localStorage.getItem(authConfig.TOKEN_KEY) !== null &&
  localStorage.getItem(authConfig.ID_KEY) !== null &&
  localStorage.getItem(authConfig.ROLE_KEY) !== null;
