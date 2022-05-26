import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentApi from 'src/api/studentApi';
import { Student } from 'src/models/student.interface';
import { alertError } from 'src/utils/alertError';
import { AppState } from '../store';

interface IInitState {
  students: Student[];
}

const initialState: IInitState = {
  students: []
};

const getAllStudents = createAsyncThunk('student/getall', async () => {
  try {
    const res = await studentApi.getAll();
    const { data } = res.data;
    return data;
  } catch (error) {
    setTimeout(() => {
      alertError(error);
    }, 3000);
    throw new Error(error);
  }
});

// const getOneStudent = createAsyncThunk('student/getone', async (id: number) => {
//   try {
//     const res = await studentApi.getOne(id);
//     const { data } = res.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// });

const createStudent = createAsyncThunk(
  'student/create',
  async (formdata: FormData) => {
    try {
      const res = await studentApi.create(formdata);
      const { data } = res.data;
      return data;
    } catch (error) {
      console.log(error);
      alertError(error);
      throw new Error(error);
    }
  }
);

// const deleteStuden t

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
    builder.addCase(createStudent.fulfilled, (state, action) => {
      state.students = [...state.students, action.payload];
    });
  }
});

const studentSelector = (state: AppState) => state.student;

export { getAllStudents, createStudent, studentSelector };

export const {} = studentSlice.actions;

export default studentSlice.reducer;
