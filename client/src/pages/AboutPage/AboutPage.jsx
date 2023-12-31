import React from 'react';
// internal imports
import {
  CustomBanner,
  AboutDetails,
  AboutTimeline,
  AboutCertificates,
} from '../../components';
import { MetaDataTitle } from '../../utils';
import bgImg from '../../assets/images/bg1.jpeg';

const AboutPage = () => {
  const bannerData = {
    heading: 'About Me',
    subHeading1: 'About Me',
    subHeading2: '',
    image: `${bgImg}`,
  };

  return (
    <>
      <MetaDataTitle title='About - Dr. Abdul Kader' />
      <CustomBanner data={bannerData} />
      <div className='mt-2 min-h-screen'>
        <div className='container mx-auto my-2 p-4 lg:p-8 flex flex-col justify-center items-center'>
          <AboutDetails />
          <AboutTimeline />
          <AboutCertificates />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
