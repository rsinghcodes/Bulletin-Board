import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import Home from '../page/Home';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Home />;
};

export default PrivateRoute;
