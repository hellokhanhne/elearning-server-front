import axiosClient from './axiosClient';

const roleApi = {
  getAll() {
    return axiosClient.get('/role');
  },

  getOne(id: number) {
    return axiosClient.get(`/role/${id}`);
  },
  create(data) {
    return axiosClient.post('/role', data);
  },
  update(id: number, data) {
    return axiosClient.put(`/role/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/role/${id}`);
  }
};

export default roleApi;
