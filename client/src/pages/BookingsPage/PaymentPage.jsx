import React from 'react';
// internal imports
import { Payment } from '../../components';
import { MetaDataTitle } from '../../utils';

const PaymentPage = () => {
  return (
    <>
      <MetaDataTitle title='Process Payment - Dr. Abdul Kader' />
      <Payment />
    </>
  );
};

export default PaymentPage;
