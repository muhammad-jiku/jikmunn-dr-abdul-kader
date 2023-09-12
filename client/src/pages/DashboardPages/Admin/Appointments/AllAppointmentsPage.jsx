import React from 'react';
import { AllAppointments } from '../../../../components';
import { MetaDataTitle } from '../../../../utils';

const AllAppointmentsPage = () => {
  return (
    <>
      <MetaDataTitle title='All Appointments - Dr. Abdul Kader' />
      <AllAppointments />
    </>
  );
};

export default AllAppointmentsPage;
