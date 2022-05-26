import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ICLass } from 'src/models/class.interface';
import { ICreateRole, IRole } from 'src/models/role.interface';

const initForm: ICreateRole = {
  role_title: '',
  role_desc: ''
};

interface RoleFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    form: ICreateRole
  ) => Promise<void>;
  role?: IRole;
}

const RoleForm: React.FC<RoleFormProps> = ({ handleSubmit, role }) => {
  const [form, setForm] = useState<ICreateRole>(role || initForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, form);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            value={form.role_title}
            label="Enter role title"
            required={true}
            name="role_title"
          />
        </Box>

        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            required={true}
            value={form.role_desc}
            label="Enter role description"
            name="role_desc"
          />
        </Box>

        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: 8 }}
          type="submit"
        >
          {role ? 'Update ' : 'create '} role
        </Button>
      </form>
    </div>
  );
};

export default RoleForm;
