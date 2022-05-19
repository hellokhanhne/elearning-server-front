import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL_IMAGE } from 'src/api/axiosClient';
import { INews } from 'src/models/news.interface';
import { useAppDispatch } from 'src/store/hooks';
import { deleteNews } from 'src/store/reducer/NewsReducer';
import Swal from 'sweetalert2';
import BulkActions from './BulkActions';

interface NewsTableProps {
  className?: string;
  news: INews[];
}

const applyPagination = (
  news: INews[],
  page: number,
  limit: number
): INews[] => {
  return news.slice(page * limit, page * limit + limit);
};

const NewsTable: FC<NewsTableProps> = ({ news }) => {
  // component state
  const [newsSelected, setNewsSelected] = useState<string[]>([]);
  const selectedBulkActions = newsSelected.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // dispatch redux
  const dispatch = useAppDispatch();

  const handleSelectAllNews = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewsSelected(
      event.target.checked ? news.map((n) => n.news_id.toString()) : []
    );
  };

  const handleSelectOneNews = (
    event: ChangeEvent<HTMLInputElement>,
    newsId: string
  ): void => {
    if (!newsSelected.includes(newsId)) {
      setNewsSelected((prevSelected) => [...prevSelected, newsId]);
    } else {
      setNewsSelected((prevSelected) =>
        prevSelected.filter((id) => id !== newsId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteNews = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNews(id));
      }
    });
  };

  const paginatedNews = applyPagination(news, page, limit);

  const selectedSomeNews =
    setNewsSelected.length > 0 && newsSelected.length < news.length;
  const selectedAllNews = newsSelected.length === news.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {/* {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Orders"
        />
      )} */}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={!selectedSomeNews}
                  indeterminate={selectedAllNews}
                  onChange={handleSelectAllNews}
                />
              </TableCell>
              <TableCell>News image</TableCell>
              <TableCell>News id</TableCell>
              <TableCell>News title</TableCell>
              <TableCell>News desc</TableCell>
              <TableCell>News category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedNews.map((n) => {
              const isNewsSelected = newsSelected.includes(
                n.news_id.toString()
              );
              return (
                <TableRow hover key={n.news_id} selected={isNewsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isNewsSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneNews(event, n.news_id.toString())
                      }
                      value={isNewsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${BASE_URL_IMAGE}/${n.news_image}`}
                      style={{
                        width: '100px',
                        objectFit: 'cover'
                      }}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {n.news_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {n.news_title.slice(0, 15) + ' ...'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {n.news_desc.slice(0, 15) + ' ...'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {n.news_category.news_category_name}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <Link
                        style={{ display: 'inline-block' }}
                        to={`/news/update/${n.news_id}`}
                      >
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        onClick={() => {
                          handleDeleteNews(n.news_id);
                        }}
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={news.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default NewsTable;
