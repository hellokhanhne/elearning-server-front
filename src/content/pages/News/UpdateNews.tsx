import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newsApi from 'src/api/newsApi';
import NewsForm from './NewsForm';

const UpdateNews = () => {
  let { id } = useParams();
  const [news, setNews] = useState(null);
  const handleSubmit = () => {};

  useEffect(() => {
    (async () => {
      const res = await newsApi.getOne(+id);
      const { data } = res.data;
      setNews(data);
    })();
  }, []);

  return (
    <Box sx={{ marginY: 5, mx: 'auto' }} style={{ maxWidth: '900px' }}>
      {news && <NewsForm handleSubmit={handleSubmit} news={news} />}
    </Box>
  );
};

export default UpdateNews;
