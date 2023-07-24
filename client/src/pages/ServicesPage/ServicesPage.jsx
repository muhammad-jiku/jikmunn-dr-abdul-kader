import React from 'react';
import bgImg from '../../assets/images/bg2.jpg';
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
      <CustomBanner data={bannerData} />
      <ServicesDetails />
    </>
  );
};

export default ServicesPage;
