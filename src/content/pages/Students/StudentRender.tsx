import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  getAllStudents,
  studentSelector
} from 'src/store/reducer/StudentReducer';
import StudentTable from './StudentTable';

function StudentRender() {
  const { students } = useAppSelector(studentSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
  }, []);
  return (
    <Card>
      <StudentTable students={students} />
    </Card>
  );
}

export default StudentRender;
