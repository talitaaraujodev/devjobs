import { Navigate, Outlet } from 'react-router-dom';
import { utils } from '../utils';

const PrivateRoute = () => {
  const showAutenticated = utils.getToken();

  return showAutenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export { PrivateRoute };
