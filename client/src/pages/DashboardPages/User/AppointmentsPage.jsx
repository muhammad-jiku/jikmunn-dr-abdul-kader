import React from 'react';
import { Appointments } from '../../../components';
import { MetaDataTitle } from '../../../utils';

const AppointmentsPage = () => {
  return (
    <>
      <MetaDataTitle title='My Appointments - Dr. Abdul Kader' />
      <Appointments />
    </>
  );
};

export default AppointmentsPage;
