import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import studentApi from 'src/api/studentApi';
import StudentForm from './StudentForm';

const UpdateStudent = () => {
  let { id } = useParams();
  const [student, setStudent] = useState(null);
  const handleSubmit = async () => {};

  useEffect(() => {
    (async () => {
      const res = await studentApi.getOne(+id);
      const { data } = res.data;
      data.role_id = data.role.role_id;
      data.class_id = data.student_class.class_id;
      delete data.role;
      delete data.student_class;
      setStudent(data);
    })();
  }, []);

  return (
    <Box sx={{ marginY: 5, mx: 'auto' }} style={{ maxWidth: '900px' }}>
      {student && <StudentForm handleSubmit={handleSubmit} student={student} />}
    </Box>
  );
};

export default UpdateStudent;
