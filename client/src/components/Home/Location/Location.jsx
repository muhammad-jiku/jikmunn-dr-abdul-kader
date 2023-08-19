import React from 'react';
import { CustomLocation } from '../../';

const Location = () => {
  return (
    <div className='mt-2 min-h-screen relative'>
      <CustomLocation />
      <div className='flex justify-center lg:justify-start p-2 container mx-auto lg:mx-0'>
        <div className='p-10 absolute top-64 sm:top-72 lg:top-[150px] bg-white drop-shadow-2xl w-full lg:w-1/2 z-50'>
          <h3 className='text-3xl lg:text-5xl text-main font-bolder font-lobster tracking-wider my-2'>
            Waiting for you
          </h3>
          <h3 className='text-xl lg:text-3xl text-gray font-bolder font-oswald tracking-widest mb-4'>
            310 Razzak Complex, SSK Road, Feni
          </h3>
          <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
          <h3 className='text-sm lg:text-lg text-black font-bold tracking-widest mt-4'>
            Sun - Thu: 04.00 pm - 08.00 pm
          </h3>
          <h3 className='text-sm lg:text-lg text-black font-bold tracking-widest my-2'>
            Saturday: 07.00 pm - 10.00 pm
          </h3>
          <h3 className='text-sm lg:text-lg text-black font-bold tracking-widest my-2'>
            Friday: Closed
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Location;
