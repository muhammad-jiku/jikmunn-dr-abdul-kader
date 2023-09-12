import React from 'react';
import bgImg from '../../assets/images/bg2.jpg';
import { CustomBanner, ServicesDetails } from '../../components';
import { MetaDataTitle } from '../../utils';

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
