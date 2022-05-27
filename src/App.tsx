import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import Loading from './components/Loading/Loading';
import ApplicationsMessenger from './content/applications/Messenger';
import DashboardCrypto from './content/dashboards/Crypto';
import Auth from './content/pages/Auth';
import NewsManagement from './content/pages/News';
import CreateNews from './content/pages/News/CreateNews';
import UpdateNews from './content/pages/News/UpdateNews';
import RoleManagement from './content/pages/Roles';
import CreateRole from './content/pages/Roles/CreateRole';
import UpdateRole from './content/pages/Roles/UpdateRole';
import UpdateRolePermission from './content/pages/Roles/UpdateRolePermission';
import Status404 from './content/pages/Status/Status404';
import StudentManagement from './content/pages/Students';
import CreateStudent from './content/pages/Students/CreateStudent';
import UpdateStudent from './content/pages/Students/UpdateStudent';
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

  useEffect(() => {
    // if (isAuthenticated) {
    //   const socket = io('http://localhost:5000');
    //   socket.on('connect', () => {
    //     socket.emit('sendmess', 'hello khanh ne');
    //   });
    //   socket.on('receive', (data: any) => {
    //     console.log('socket', data);
    //   });
    //   return () => {
    //     socket.close();
    //   };
    // }
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <BrowserRouter>
            {isAuthenticated && <SidebarLayout />}
            {/* dashboard */}
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

              {/* news  */}
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
                    redirectPath="/news"
                  >
                    <UpdateNews />
                  </ProtectedRouter>
                }
              />
              {/* student  */}
              <Route
                path="/student"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/student"
                  >
                    <StudentManagement />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/student/create"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/student/create"
                  >
                    <CreateStudent />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/student/update/:id"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/student"
                  >
                    <UpdateStudent />
                  </ProtectedRouter>
                }
              />
              {/* role  */}
              <Route
                path="/role"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/role"
                  >
                    <RoleManagement />
                  </ProtectedRouter>
                }
              />

              <Route
                path="/role/create"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/role/create"
                  >
                    <CreateRole />
                  </ProtectedRouter>
                }
              />

              <Route
                path="/role/update/permission/:id"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/role"
                  >
                    <UpdateRolePermission />
                  </ProtectedRouter>
                }
              />

              <Route
                path="/role/update/:id"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/role"
                  >
                    <UpdateRole />
                  </ProtectedRouter>
                }
              />

              {/* message  */}
              <Route
                path="/messenger"
                element={
                  <ProtectedRouter
                    isAllowed={isAuthenticated}
                    redirectPath="/messenger"
                  >
                    <ApplicationsMessenger />
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
