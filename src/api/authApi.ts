import axiosClient from './axiosClient';

const authApi = {
  login(tokenId: string) {
    return axiosClient.post('/auth/google/login', {
      tokenId
    });
  },
  loadUser() {
    return axiosClient.get('/auth/loaduser');
  }
};

export default authApi;
