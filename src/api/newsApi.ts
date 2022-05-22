import axiosClient from './axiosClient';

const newsApi = {
  getAll() {
    return axiosClient.get('/news');
  },
  getAllCategory() {
    return axiosClient.get('news-category');
  },
  getOne(id: number) {
    return axiosClient.get(`/news/${id}`);
  },
  create(data: FormData) {
    return axiosClient.post('/news', data);
  },
  update(id: number, data: FormData) {
    return axiosClient.put(`/news/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/news/${id}`);
  }
};

export default newsApi;
