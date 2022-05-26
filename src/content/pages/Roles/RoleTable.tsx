import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SecurityIcon from '@mui/icons-material/Security';
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
import { IRole } from 'src/models/role.interface';
import { useAppDispatch } from 'src/store/hooks';
import { deleteRole } from 'src/store/reducer/RoleReducer';
import Swal from 'sweetalert2';
import BulkActions from './BulkActions';

interface RoleTableProps {
  className?: string;
  roles: IRole[];
}

const applyPagination = (
  roles: IRole[],
  page: number,
  limit: number
): IRole[] => {
  return roles.slice(page * limit, page * limit + limit);
};

const RoleTable: FC<RoleTableProps> = ({ roles }) => {
  // component state
  const [roleSelector, setRoleSelector] = useState<string[]>([]);
  const selectedBulkActions = roleSelector.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // dispatch redux
  const dispatch = useAppDispatch();

  const handleSelectAllRole = (event: ChangeEvent<HTMLInputElement>): void => {
    setRoleSelector(
      event.target.checked ? roles.map((s) => s.role_id.toString()) : []
    );
  };

  const handleSelectOneNews = (
    event: ChangeEvent<HTMLInputElement>,
    role_id: string
  ): void => {
    if (!roleSelector.includes(role_id)) {
      setRoleSelector((prevSelected) => [...prevSelected, role_id]);
    } else {
      setRoleSelector((prevSelected) =>
        prevSelected.filter((id) => id !== role_id)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteRole = (id: number) => {
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
        dispatch(deleteRole(id));
      }
    });
  };

  const paginateRoles = applyPagination(roles, page, limit);

  const selectedSomeRoles =
    roleSelector.length > 0 && roleSelector.length < roles.length;
  const selectedAllRoles = roleSelector.length === roles.length;
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
                  checked={selectedSomeRoles}
                  indeterminate={selectedAllRoles}
                  onChange={handleSelectAllRole}
                />
              </TableCell>

              <TableCell>Role id</TableCell>
              <TableCell>Role title</TableCell>
              <TableCell>Role desc</TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateRoles.map((s) => {
              const isRoleSelected = roleSelector.includes(
                s.role_id.toString()
              );
              return (
                <TableRow hover key={s.role_id} selected={isRoleSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isRoleSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneNews(event, s.role_id.toString())
                      }
                      value={isRoleSelected}
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
                      {s.role_id}
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
                      {s.role_title}
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
                      {s.role_desc}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit permission" arrow>
                      <Link
                        style={{ display: 'inline-block' }}
                        to={`/role/update/permission/${s.role_id}`}
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
                          <SecurityIcon fontSize="small" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Edit role" arrow>
                      <Link
                        style={{ display: 'inline-block' }}
                        to={`/role/update/${s.role_id}`}
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
                    <Tooltip title="Delete role" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        onClick={() => {
                          handleDeleteRole(s.role_id);
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
          count={roles.length}
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

export default RoleTable;
