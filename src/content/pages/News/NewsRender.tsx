import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getNews, newsSelector } from 'src/store/reducer/NewsReducer';
import NewsTable from './NewsTable';

function NewsRender() {
  const { news } = useAppSelector(newsSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, []);
  return (
    <Card>
      <NewsTable news={news} />
    </Card>
  );
}

export default NewsRender;
