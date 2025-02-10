import React, { useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';

interface PrivateRouteProps {
  Page: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ Page }) => {
  const { handleGetUser } = useMainContext();
  useEffect(() => {
    handleGetUser();
  }, []);

  return <Page />;
};
