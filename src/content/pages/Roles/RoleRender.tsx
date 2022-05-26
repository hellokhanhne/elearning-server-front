import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getRoles, roleSelector } from 'src/store/reducer/RoleReducer';
import RoleTable from './RoleTable';

function RoleRender() {
  const { roles } = useAppSelector(roleSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRoles());
  }, []);
  return (
    <Card>
      <RoleTable roles={roles} />
    </Card>
  );
}

export default RoleRender;
