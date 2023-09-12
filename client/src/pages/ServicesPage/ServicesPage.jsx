import React from 'react';
// internal imports
import bgImg from '../../assets/images/bg2.jpg';
import { MetaDataTitle } from '../../utils';
import { CustomBanner, ServicesDetails } from '../../components';

const ServicesPage = () => {
  const bannerData = {
    heading: 'Our Services',
    subHeading1: 'All Services',
    subHeading2: '',
    image: `${bgImg}`,
  };

  return (
    <>
      <MetaDataTitle title='Services - Dr. Abdul Kader' />
      <CustomBanner data={bannerData} />
      <ServicesDetails />
    </>
  );
};

export default ServicesPage;
