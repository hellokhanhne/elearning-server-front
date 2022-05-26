import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreateRole } from 'src/models/role.interface';
import { useAppDispatch } from 'src/store/hooks';
import { createRole } from 'src/store/reducer/RoleReducer';
import RoleForm from './RoleForm';

const CreateRole = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    form: ICreateRole
  ) => {
    e.preventDefault();
    await dispatch(createRole(form));
    navigate('/role', { replace: true });
  };

  return (
    <Box sx={{ marginY: 5, mx: 'auto' }} style={{ maxWidth: '900px' }}>
      <RoleForm handleSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateRole;
