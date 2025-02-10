import React from 'react';
import { SignInContainer } from '../containers';
import { HomeLayout } from '../layouts';

export const SignIn: React.FC = () => {
  return (
    <HomeLayout>
      <SignInContainer />
    </HomeLayout>
  );
};
