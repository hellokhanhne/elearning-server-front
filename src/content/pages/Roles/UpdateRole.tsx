import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roleApi } from 'src/api';
import { ICreateRole, IRole } from 'src/models/role.interface';
import { useAppDispatch } from 'src/store/hooks';
import { updateRole } from 'src/store/reducer/RoleReducer';
import RoleForm from './RoleForm';

const UpdateRole = () => {
  let { id } = useParams();
  const [role, setRole] = useState<IRole>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    dataForm: ICreateRole
  ) => {
    e.preventDefault();
    dispatch(updateRole({ id: +id, dataForm }));
  };

  useEffect(() => {
    (async () => {
      const res = await roleApi.getOne(+id);
      const { data } = res.data;
      setRole(data);
    })();
  }, []);

  return (
    <Box sx={{ marginY: 5, mx: 'auto' }} style={{ maxWidth: '900px' }}>
      {role && <RoleForm handleSubmit={handleSubmit} role={role} />}
    </Box>
  );
};

export default UpdateRole;
