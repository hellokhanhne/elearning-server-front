import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreateStudent } from 'src/models/student.interface';
import { useAppDispatch } from 'src/store/hooks';
import { createStudent } from 'src/store/reducer/StudentReducer';
import NewsForm from './StudentForm';

const CreateStudent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    form: ICreateStudent
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', form.avatar);
    formData.append('student_email', form.student_email);
    formData.append('student_mobile', form.student_mobile);
    formData.append('student_fisrtName', form.student_fisrtName);
    formData.append('student_lastName', form.student_lastName);
    formData.append('student_address', form.student_address);
    formData.append('role_id', '' + form.role_id);
    formData.append('class_id', '' + form.class_id);
    await dispatch(createStudent(formData));
    navigate('/student', { replace: true });
  };

  return (
    <Box sx={{ marginY: 5, mx: 'auto' }} style={{ maxWidth: '900px' }}>
      <NewsForm handleSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateStudent;
