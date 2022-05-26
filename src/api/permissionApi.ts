import axiosClient from './axiosClient';

const permissionApi = {
  getAll() {
    return axiosClient.get('/permission');
  },

  getOne(id: number) {
    return axiosClient.get(`/permission/${id}`);
  },
  create(data) {
    return axiosClient.post('/permission', data);
  },
  update(id: number, data) {
    return axiosClient.put(`/permission/${id}`, data);
  },

  delete(id: number) {
    return axiosClient.delete(`/permission/${id}`);
  }
};

export default permissionApi;
