import { PhotoCamera } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BASE_URL_IMAGE } from 'src/api/axiosClient';
import classApi from 'src/api/classApi';
import roleApi from 'src/api/roleApi';
import { ICLass } from 'src/models/class.interface';
import { IRole } from 'src/models/role.interface';
import { ICreateStudent } from 'src/models/student.interface';

const initForm: ICreateStudent = {
  avatar: null,
  class_id: null,
  role_id: null,
  student_address: '',
  student_avatar: '',
  student_email: '',
  student_fisrtName: '',
  student_id: null,
  student_lastName: '',
  student_mobile: ''
};

interface StudentFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    form: ICreateStudent
  ) => Promise<void>;
  student?: any;
}

interface IRoleAndClass {
  roles: IRole[];
  classes: ICLass[];
}

const StudentForm: React.FC<StudentFormProps> = ({ handleSubmit, student }) => {
  const [form, setForm] = useState<ICreateStudent>(student || initForm);
  const [options, setOptions] = useState<IRoleAndClass>({
    roles: [],
    classes: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, form);
  };

  useEffect(() => {
    (async () => {
      const res = await roleApi.getAll();
      const { data: roles } = res.data;
      const res2 = await classApi.getAll();
      const { data: classes } = res2.data;
      setOptions({
        roles,
        classes
      });
    })();
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Box
          style={{ display: 'flex', alignItems: 'center' }}
          sx={{ marginBottom: 5 }}
        >
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            Choose an avatar image
          </Typography>
          <label htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              type="file"
              required={true}
              name="avatar"
              onChange={(e: any) => {
                setForm({
                  ...form,
                  avatar: e.target.files[0]
                });
              }}
              style={{ display: 'none' }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        {form.avatar && (
          <img
            src={URL.createObjectURL(form.avatar)}
            alt=""
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              marginBottom: '30px'
            }}
          />
        )}
        {form.student_avatar && !form.avatar && (
          <img
            src={`${BASE_URL_IMAGE}/${form.student_avatar}`}
            alt=""
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              marginBottom: '30px'
            }}
          />
        )}
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            value={form.student_fisrtName}
            label="Enter first name of student"
            required={true}
            name="student_fisrtName"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            required={true}
            value={form.student_lastName}
            label="Enter last name of student"
            name="student_lastName"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            required={true}
            value={form.student_email}
            label="Enter email of student"
            name="student_email"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            required={true}
            value={form.student_mobile}
            label="Enter phone number of student"
            name="student_mobile"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <TextField
            onChange={handleChange}
            fullWidth
            required={true}
            value={form.student_address}
            label="Enter address of student"
            name="student_address"
          />
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <FormControl fullWidth>
            <Select
              name="role_id"
              required={true}
              value={form.role_id}
              onChange={handleChange}
            >
              {options.roles.length > 0 &&
                options.roles.map((r) => (
                  <MenuItem key={r.role_id} value={r.role_id}>
                    {r.role_title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 5 }}>
          <FormControl fullWidth>
            <Select
              name="class_id"
              required={true}
              value={form.class_id}
              onChange={handleChange}
            >
              {options.classes.length > 0 &&
                options.classes.map((c) => (
                  <MenuItem key={c.class_id} value={c.class_id}>
                    {c.class_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: 8 }}
          type="submit"
        >
          {student ? 'Update ' : 'create '} student
        </Button>
      </form>
    </div>
  );
};

export default StudentForm;
