import React from 'react';
// internal imports
import { Auth } from '../../components';
import { MetaDataTitle } from '../../utils';

const AuthPage = () => {
  return (
    <>
      <MetaDataTitle title='Signin or Create an account - Dr. Abdul Kader' />
      <Auth />
    </>
  );
};

export default AuthPage;
