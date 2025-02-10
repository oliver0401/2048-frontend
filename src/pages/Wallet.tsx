import React from 'react';
import { WalletContainer } from '../containers';
import { HomeLayout } from '../layouts';

export const Wallet: React.FC = () => {
  return (
    <HomeLayout>
      <WalletContainer />
    </HomeLayout>
  );
};
