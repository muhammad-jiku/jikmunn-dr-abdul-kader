import React from 'react';
// internal import
import PartnerCard from './PartnerCard';

const Partners = () => {
  return (
    <div className='container mx-auto my-2 p-10 min-h-[600px] flex flex-col justify-center items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
        Meet My Partners
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        the pride of modern medicine
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='container mx-auto p-4'>
        <PartnerCard />
      </div>
    </div>
  );
};

export default Partners;
