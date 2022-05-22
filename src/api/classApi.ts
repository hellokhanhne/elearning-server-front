import axiosClient from './axiosClient';

const classApi = {
  getAll() {
    return axiosClient.get('/class');
  },

  getOne(id: number) {
    return axiosClient.get(`/class/${id}`);
  },
  create(data) {
    return axiosClient.post('/class', data);
  },
  update(id: number, data) {
    return axiosClient.put(`/class/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/class/${id}`);
  }
};

export default classApi;
