import React from 'react';
// internal imports
import bgImg from '../../assets/images/bg1.jpeg';
import { MetaDataTitle } from '../../utils';
import { CustomBanner, PricesDetails } from '../../components';

const PricesPage = () => {
  const bannerData = {
    heading: 'Our Prices',
    subHeading1: 'All Prices',
    subHeading2: '',
    image: `${bgImg}`,
  };
  return (
    <>
      <MetaDataTitle title='Prices - Dr. Abdul Kader' />
      <CustomBanner data={bannerData} />
      <PricesDetails />
    </>
  );
};

export default PricesPage;
