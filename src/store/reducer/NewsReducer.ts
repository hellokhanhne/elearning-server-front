import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newsApi from 'src/api/newsApi';
import { INews } from 'src/models/news.interface';
import { alertError } from 'src/utils/alertError';
import Swal from 'sweetalert2';
import { AppState } from '../store';

interface IUpdateNews {
  id: number;
  dataForm: FormData;
}

interface IInitState {
  news: INews[];
  error: {
    message: string;
  };
}

const initialState: IInitState = {
  news: [],
  error: {
    message: null
  }
};

const getNews = createAsyncThunk('news/getNews', async () => {
  try {
    const res = await newsApi.getAll();
    const { data } = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    setTimeout(() => {
      alertError(error);
    }, 3000);
    console.log(error);
    throw new Error(error);
  }
});

const createNews = createAsyncThunk(
  'news/create',
  async (dataForm: FormData) => {
    try {
      const res = await newsApi.create(dataForm);
      const { data } = res.data;
      return data;
    } catch (error) {
      console.log(error);

      alertError(error);
      throw new Error(error);
    }
  }
);

const updateNews = createAsyncThunk(
  'news/update',
  async ({ id, dataForm }: IUpdateNews) => {
    try {
      const res = await newsApi.update(id, dataForm);
      const { data } = res.data;
      return data;
    } catch (error) {
      console.log(error);
      alertError(error);
      throw new Error(error);
    }
  }
);

const deleteNews = createAsyncThunk('news/delete', async (id: number) => {
  try {
    await newsApi.delete(id);
    Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
    return id;
  } catch (error) {
    console.log(error);
    alertError(error);
    throw new Error(error);
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });

    builder.addCase(createNews.fulfilled, (state, action) => {
      // state.news.push(action.payload);
    });
    builder.addCase(updateNews.fulfilled, (state, action) => {
      state.news = state.news.map((n) => {
        if (n.news_id === action.payload.news_id) {
          return action.payload;
        }
        return n;
      });
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.news = state.news.filter((n) => n.news_id !== action.payload);
    });
  }
});

const newsSelector = (state: AppState) => {
  return state.news;
};

export const {} = newsSlice.actions;

export { createNews, getNews, deleteNews, updateNews, newsSelector };

export default newsSlice.reducer;
