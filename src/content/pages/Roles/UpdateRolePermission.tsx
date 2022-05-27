import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { permissionApi, roleApi } from 'src/api';
import { IRole } from 'src/models/role.interface';
import { alertError } from 'src/utils/alertError';
import Swal from 'sweetalert2';
import { IPermission } from '../../../models/permission.interface';

const colors = {
  POST: '#49cc90',
  GET: '#61affe',
  PUT: '#fca130',
  PATCH: '#50e3c2',
  DELETE: '#f93e3e'
};

const UpdateRolePermission = () => {
  let { id } = useParams();
  const [role, setRole] = useState<IRole>(null);
  const [permissions, setPermissons] = useState<IPermission[]>([]);
  const [permissionSelector, setPermissonSelector] = useState<string[]>([]);

  const handleOnchange = (id: string) => {
    const isExist = permissionSelector.includes(id);
    setPermissonSelector(
      isExist
        ? permissionSelector.filter((p) => p !== id)
        : [...permissionSelector, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    isChecked
      ? setPermissonSelector(permissions.map((p) => p.permission_id.toString()))
      : setPermissonSelector([]);
  };

  const handeSavePermission = async () => {
    try {
      await roleApi.updatePermission(+id, {
        permissionIds: permissionSelector
      });
      Swal.fire('Updated!', 'Your record has been updated.', 'success');
    } catch (error) {
      alertError(error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await roleApi.getOne(+id);
      const resPer = await permissionApi.getAll();
      const { data } = res.data;
      const { data: permData } = resPer.data;
      setRole(data);
      setPermissonSelector(
        data.role_permissions.map((r: IPermission) =>
          r.permission_id.toString()
        )
      );
      setPermissons(permData);
    })();
  }, []);

  return (
    <div
      style={{
        padding: '40px 100px'
      }}
    >
      <Typography variant="h3" component="h3" gutterBottom>
        Set permisson for role {role?.role_title}
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={permissionSelector.length === permissions.length}
              onChange={handleSelectAll}
            />
          }
          label="Select all"
        />
        {permissions.map((p) => (
          <FormControlLabel
            key={p.permission_id}
            control={
              <Checkbox
                checked={permissionSelector.includes('' + p.permission_id)}
                onChange={() => handleOnchange(p.permission_id.toString())}
              />
            }
            label={
              <label>
                {p.permission_url}{' '}
                <label
                  style={{
                    marginLeft: 10
                  }}
                >
                  ( Method :{' '}
                  <b
                    style={{
                      color: colors[p.permission_desc]
                    }}
                  >
                    {p.permission_desc}
                  </b>{' '}
                  )
                </label>
              </label>
            }
          />
        ))}
      </FormGroup>

      <Button
        variant="contained"
        style={{
          marginTop: 20
        }}
        onClick={handeSavePermission}
      >
        Save
      </Button>
    </div>
  );
};

export default UpdateRolePermission;
