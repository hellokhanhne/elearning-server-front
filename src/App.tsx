import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading/Loading';

import DashboardCrypto from './content/dashboards/Crypto';
import Auth from './content/pages/Auth';
import NewsManagement from './content/pages/News';

import CreateNews from './content/pages/News/CreateNews';
import UpdateNews from './content/pages/News/UpdateNews';
import Status404 from './content/pages/Status/Status404';
import SidebarLayout from './layouts/SidebarLayout';
import ProtectedRouter from './router/ProtectedRouter';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  authSelector,
  loadUser,
  setAuthLoading
} from './store/reducer/AuthReducer';
import ThemeProvider from './theme/ThemeProvider';
import { setToken } from './utils/setToken';

const App = () => {
  const { isAuthenticated, isLoading } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();
  const checkAuth = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      setToken(access_token);
      return dispatch(loadUser());
    }
    return dispatch(setAuthLoading(false));
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      {isLoading && <Loading />}

      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <BrowserRouter>
            {isAuthenticated && <SidebarLayout />}

            <Routes>
              <Route path="/login" element={<Auth />} />
              {['/', '/dashboard'].map((t) => (
                <Route
                  key={t}
                  path={t}
                  element={
                    <ProtectedRouter isAllowed={isAuthenticated}>
                      <DashboardCrypto />
                    </ProtectedRouter>
                  }
                />
              ))}
              <Route
                path="/news"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/news"
                  >
                    <NewsManagement />
                  </ProtectedRouter>
                }
              ></Route>
              <Route
                path="/news/create"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/news/create"
                  >
                    <CreateNews />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/news/update/:id"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/news/update/:id"
                  >
                    <UpdateNews />
                  </ProtectedRouter>
                }
              />
              {/* not match  */}
              <Route path="*" element={<Status404 />} />
            </Routes>
          </BrowserRouter>
          ,
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};
export default App;
