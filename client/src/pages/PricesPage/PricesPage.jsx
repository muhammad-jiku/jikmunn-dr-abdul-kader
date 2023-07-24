import React from 'react';
import bgImg from '../../assets/images/bg1.jpeg';
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
      <CustomBanner data={bannerData} />
      <PricesDetails />
    </>
  );
};

export default PricesPage;
