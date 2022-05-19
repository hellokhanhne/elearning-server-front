import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { Navigate } from 'react-router-dom';
import Loading from 'src/components/Loading/Loading';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  authSelector,
  login,
  setAuthLoading
} from 'src/store/reducer/AuthReducer';

const theme = createTheme();

export default function Auth() {
  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading } = useAppSelector(authSelector);
  const responseGoogle = (response: GoogleLoginResponse) => {
    console.log(response);
    if (response.tokenId) {
      dispatch(setAuthLoading(true));
      dispatch(login(response.tokenId));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              marginBottom={3}
              marginTop={1.5}
            >
              Sign in to elearning system
            </Typography>
            <GoogleLogin
              clientId="63324271315-odui1kag3978rhq6qa4g9jccisfu5pcl.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  variant="outlined"
                  sx={{ margin: 1 }}
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login with google
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              autoLoad={false}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
