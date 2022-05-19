import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
       
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const ProtectedRouter = ({
  isAllowed,
  redirectPath = '/login',
  children
}: IProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? <MainWrapper>{children}</MainWrapper> : <Outlet />;
};

export default ProtectedRouter;
