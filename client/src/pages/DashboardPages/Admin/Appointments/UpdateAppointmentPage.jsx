import React from 'react';
// internal imports
import { MetaDataTitle } from '../../../../utils';
import { UpdateAppointment } from '../../../../components';

const UpdateAppointmentPage = () => {
  return (
    <>
      <MetaDataTitle title={`Update Appointment - Dr. Abdul Kader`} />
      <UpdateAppointment />
    </>
  );
};

export default UpdateAppointmentPage;
