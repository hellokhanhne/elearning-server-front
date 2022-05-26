import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roleApi } from 'src/api';
import { ICreateRole, IRole } from 'src/models/role.interface';
import { alertError } from 'src/utils/alertError';
import Swal from 'sweetalert2';
import { AppState } from '../store';

interface IInitState {
  roles: IRole[];
}

const initialState: IInitState = {
  roles: []
};

const getRoles = createAsyncThunk('role/getRoles', async () => {
  try {
    const res = await roleApi.getAll();
    const { data } = res.data;
    return data;
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      alertError(error);
    }, 3000);
    throw new Error(error);
  }
});

const createRole = createAsyncThunk(
  'role/createRole',
  async (dataForm: ICreateRole) => {
    try {
      const res = await roleApi.create(dataForm);
      const { data } = res.data;
      return data;
    } catch (error) {
      console.log(error);
      alertError(error);
      throw new Error(error);
    }
  }
);

const updateRole = createAsyncThunk(
  'role/update',
  async ({ id, dataForm }: { id: number; dataForm: ICreateRole }) => {
    try {
      const res = await roleApi.update(id, dataForm);
      const { data } = res.data;
      Swal.fire('Updated!', 'Your record has been updated.', 'success');
      return data;
    } catch (error) {
      alertError(error);
      console.log(error);
      throw new Error(error);
    }
  }
);

const deleteRole = createAsyncThunk('role/delete', async (id: number) => {
  try {
    await roleApi.delete(id);
    Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
    return id;
  } catch (error) {
    alertError(error);
    console.log(error);
    throw new Error(error);
  }
});

const newsSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
    builder.addCase(createRole.fulfilled, (state, action) => {
      // state.roles.push(action.payload);
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.roles = state.roles.map((n) => {
        if (n.role_id === action.payload.role_id) {
          return action.payload;
        }
        return n;
      });
    });
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.roles = state.roles.filter((n) => n.role_id !== action.payload);
    });
  }
});

const roleSelector = (state: AppState) => {
  return state.role;
};

export const {} = newsSlice.actions;

export { roleSelector, getRoles, updateRole, createRole, deleteRole };

export default newsSlice.reducer;
