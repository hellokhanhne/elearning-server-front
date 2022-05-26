import { ICreateRole } from 'src/models/role.interface';
import axiosClient from './axiosClient';

const roleApi = {
  getAll() {
    return axiosClient.get('/role');
  },

  getOne(id: number) {
    return axiosClient.get(`/role/${id}`);
  },
  create(data: ICreateRole) {
    return axiosClient.post('/role', data);
  },
  update(id: number, data: ICreateRole) {
    return axiosClient.put(`/role/${id}`, data);
  },
  updatePermission(
    id: number,
    data: {
      permissionIds: string[];
    }
  ) {
    return axiosClient.patch(`/role/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/role/${id}`);
  }
};

export default roleApi;
