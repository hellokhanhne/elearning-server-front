import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INewsCreate } from 'src/models/news.interface';
import { useAppDispatch } from 'src/store/hooks';
import { createNews } from 'src/store/reducer/NewsReducer';
import NewsForm from './NewsForm';

const CreateNews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    form: INewsCreate
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', form.image);
    formData.append('news_category_id', `${form.news_category_id}`);
    formData.append('news_content', form.news_content);
    formData.append('news_desc', form.news_desc);
    formData.append('news_title', form.news_title);
    await dispatch(createNews(formData));
    navigate('/news', { replace: true });
  };

  return (
    <Box sx={{ marginY: 5, mx: 'auto' }} style={{ maxWidth: '900px' }}>
      <NewsForm handleSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateNews;
