import { axiosClient } from 'src/api';

export const setToken = (token: string) => {
  if (token) {
    return (axiosClient.defaults.headers.common['Authorization'] =
      'Bearer ' + token);
  }
  return (axiosClient.defaults.headers.common['Authorization'] = null);
};
