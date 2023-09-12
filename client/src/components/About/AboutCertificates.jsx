import React from 'react';
// internal import
import CertificateCard from './CertificateCard';

const AboutCertificates = () => {
  return (
    <>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-10'>
        Why People Choose Me
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        when quality matters to you
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='container mx-auto p-4'>
        <CertificateCard />
      </div>
    </>
  );
};

export default AboutCertificates;
