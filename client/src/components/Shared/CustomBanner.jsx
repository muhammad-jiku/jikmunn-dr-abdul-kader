import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const CustomBanner = ({ data }) => {
  return (
    <div
      className='mt-2 min-h-[600px] bg-cover bg-no-repeat bg-opacity-80 w-full flex flex-col relative opacity-75'
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className='flex justify-center lg:justify-start p-4 container mx-auto lg:mx-2'>
        <div className='p-10 absolute top-52 lg:top-48 bg-white drop-shadow-2xl w-full lg:w-1/2 z-50'>
          <h3 className='text-5xl lg:text-7xl text-main font-bolder font-lobster tracking-wider my-2'>
            {data?.heading}
          </h3>
          <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
          <h3 className='text-xs sm:text-sm lg:text-lg text-black font-bold tracking-widest mt-6 flex items-center'>
            <span className='mx-2'>Home</span>{' '}
            <AiOutlineArrowRight className='text-lg' />
            <span className='mx-2'>{data?.subHeading1}</span>{' '}
            {data?.subHeading2?.length > 0 ? (
              <>
                <AiOutlineArrowRight className='text-lg' />
                <span className='mx-2'>{data?.subHeading2}</span>
              </>
            ) : null}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CustomBanner;
