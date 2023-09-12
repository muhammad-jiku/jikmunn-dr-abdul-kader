import React from 'react';
// internal imports
import { Bookings } from '../../components';
import { MetaDataTitle } from '../../utils';

const BookingsPage = () => {
  return (
    <>
      <MetaDataTitle title='My Bookings - Dr. Abdul Kader' />
      <Bookings />
    </>
  );
};

export default BookingsPage;
