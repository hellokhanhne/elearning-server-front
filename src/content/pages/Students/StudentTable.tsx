import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
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
import { Student } from 'src/models/student.interface';
import { useAppDispatch } from 'src/store/hooks';
import Swal from 'sweetalert2';
import BulkActions from './BulkActions';

interface StudentTableProps {
  className?: string;
  students: Student[];
}

const applyPagination = (
  students: Student[],
  page: number,
  limit: number
): Student[] => {
  return students.slice(page * limit, page * limit + limit);
};

const StudentTable: FC<StudentTableProps> = ({ students }) => {
  // component state
  const [studentSelector, setStudentSelector] = useState<string[]>([]);
  const selectedBulkActions = studentSelector.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // dispatch redux
  const dispatch = useAppDispatch();

  const handleSelectAllStudent = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setStudentSelector(
      event.target.checked ? students.map((s) => s.student_id.toString()) : []
    );
  };

  const handleSelectOneNews = (
    event: ChangeEvent<HTMLInputElement>,
    newsId: string
  ): void => {
    if (!studentSelector.includes(newsId)) {
      setStudentSelector((prevSelected) => [...prevSelected, newsId]);
    } else {
      setStudentSelector((prevSelected) =>
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

  const handleDeleteStudent = (id: number) => {
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
        // dispatch(deleteNews(id));
      }
    });
  };

  const paginatedStudents = applyPagination(students, page, limit);

  const selectedSomeStudents =
    setStudentSelector.length > 0 && studentSelector.length < students.length;
  const selectedAllStudents = studentSelector.length === students.length;
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
                  checked={!selectedSomeStudents}
                  indeterminate={selectedAllStudents}
                  onChange={handleSelectAllStudent}
                />
              </TableCell>
              <TableCell>Student avatar</TableCell>
              <TableCell>Student id</TableCell>
              <TableCell>Student firstname</TableCell>
              <TableCell>Student lastname</TableCell>
              <TableCell>Student email</TableCell>
              <TableCell>Student mobie</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((s) => {
              const isNewsSelected = studentSelector.includes(
                s.student_id.toString()
              );
              return (
                <TableRow hover key={s.student_id} selected={isNewsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isNewsSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneNews(event, s.student_id.toString())
                      }
                      value={isNewsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${BASE_URL_IMAGE}/${s.student_avatar}`}
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
                      {s.student_id}
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
                      {s.student_fisrtName}
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
                      {s.student_lastName}
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
                      {s.student_email}
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
                      {s.student_mobile}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit Student" arrow>
                      <Link
                        style={{ display: 'inline-block' }}
                        to={`/student/update/${s.student_id}`}
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
                    <Tooltip title="Delete Student" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        onClick={() => {
                          handleDeleteStudent(s.student_id);
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
          count={students.length}
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

export default StudentTable;
