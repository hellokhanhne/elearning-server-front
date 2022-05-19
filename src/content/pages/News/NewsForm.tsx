import { PhotoCamera } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import ImageUploader from 'quill-image-uploader';
import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { BASE_URL_IMAGE } from 'src/api/axiosClient';
import newsApi from 'src/api/newsApi';
import { INewsCategory, INewsCreate } from 'src/models/news.interface';
import { formats, modules } from 'src/utils/editor';

Quill.register('modules/imageUploader', ImageUploader);

const initForm: INewsCreate = {
  image: null,
  news_title: '',
  news_desc: '',
  news_category_id: 1,
  news_content: '',
  news_image: null
};

interface NewsFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    form: INewsCreate
  ) => void;
  news?: any;
}

const NewsForm: React.FC<NewsFormProps> = ({ handleSubmit, news }) => {
  const [form, setForm] = useState(news || initForm);
  const [categories, setCategories] = useState<INewsCategory[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, form);
  };

  useEffect(() => {
    (async () => {
      const res = await newsApi.getAllCategory();
      const { data } = res.data;
      setCategories(data);
    })();
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Box
          style={{ display: 'flex', alignItems: 'center' }}
          sx={{ marginBottom: 5 }}
        >
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            Choose an avatar image
          </Typography>
          <label htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              type="file"
              name="image"
              onChange={(e: any) => {
                setForm({
                  ...form,
                  image: e.target.files[0]
                });
              }}
              style={{ display: 'none' }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            alt=""
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              marginBottom: '30px'
            }}
          />
        )}
        {!form.image && form.news_image && (
          <img
            src={`${BASE_URL_IMAGE}/${form.news_image}`}
            alt=""
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              marginBottom: '30px'
            }}
          />
        )}
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            value={form.news_title}
            label="Enter title of news"
            name="news_title"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            value={form.news_desc}
            label="Enter desc of news"
            name="news_desc"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <FormControl fullWidth>
            <Select
              name="news_category_id"
              value={form.news_category_id}
              onChange={handleChange}
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <MenuItem key={c.news_category_id} value={c.news_category_id}>
                    {c.news_category_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <ReactQuill
          onChange={(value) =>
            setForm({
              ...form,
              news_content: value
            })
          }
          value={form.news_content}
          theme="snow"
          modules={modules}
          formats={formats}
        ></ReactQuill>
        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: 8 }}
          type="submit"
        >
          {news ? 'Update ' : 'create '} news
        </Button>
      </form>
    </div>
  );
};

export default NewsForm;
