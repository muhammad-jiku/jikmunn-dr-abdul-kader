import React from 'react';
// internal imports
import { Profile } from '../../components';
import { MetaDataTitle } from '../../utils';

const MyProfilePage = () => {
  return (
    <>
      <MetaDataTitle title='My Profile - Dr. Abdul Kader' />
      <Profile />
    </>
  );
};

export default MyProfilePage;
