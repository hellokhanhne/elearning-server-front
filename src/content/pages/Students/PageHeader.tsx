import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Student
        </Typography>
        {/* <Typography variant="subtitle2">
          {user.name}, these are news
        </Typography> */}
      </Grid>
      <Grid item>
        <Link to="/student/create" style={{ display: 'block' }}>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Create new student
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
