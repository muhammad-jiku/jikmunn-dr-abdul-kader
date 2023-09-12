import React from 'react';
// internal imports
import { MetaDataTitle } from '../../../utils';
import { Appointments } from '../../../components';

const AppointmentsPage = () => {
  return (
    <>
      <MetaDataTitle title='My Appointments - Dr. Abdul Kader' />
      <Appointments />
    </>
  );
};

export default AppointmentsPage;
