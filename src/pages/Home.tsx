import React from 'react';
import { HomeContainer } from '../containers';
import { HomeLayout } from '../layouts';

export const Home: React.FC = () => {
  return (
    <HomeLayout>
      <HomeContainer />
    </HomeLayout>
  );
};
