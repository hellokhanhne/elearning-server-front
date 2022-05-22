import axiosClient from './axiosClient';

const studentApi = {
  getAll() {
    return axiosClient.get('/student');
  },

  getOne(id: number) {
    return axiosClient.get(`/student/${id}`);
  },
  create(data: FormData) {
    return axiosClient.post('/student', data);
  },
  update(id: number, data: FormData) {
    return axiosClient.put(`/student/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/student/${id}`);
  }
};

export default studentApi;
