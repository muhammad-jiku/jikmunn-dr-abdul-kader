import React from 'react';
// internal imports
import { MetaDataTitle } from '../../../../utils';
import { AllAppointments } from '../../../../components';

const AllAppointmentsPage = () => {
  return (
    <>
      <MetaDataTitle title='All Appointments - Dr. Abdul Kader' />
      <AllAppointments />
    </>
  );
};

export default AllAppointmentsPage;
