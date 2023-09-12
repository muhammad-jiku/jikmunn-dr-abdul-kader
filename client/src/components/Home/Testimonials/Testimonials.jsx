import React from 'react';
// external import
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
// internal imports
import TestimonialCard from './TestimonialCard';
import bpCheckingImg from '../../../assets/images/bpCheckinggg.jpg';
// import bpCheckingImg from '../../../assets/images/bpChecking.jpg';
// import bpCheckingImg from '../../../assets/images/bpCheckingg.jpeg';
// import bpCheckingImg from '../../../assets/images/bpCheckingBlur.jpg';

const Testimonials = () => {
  return (
    <div className='hero min-h-screen w-full container m-auto p-4 lg:p-10 flex flex-col justify-center items-center'>
      <div
        className='min-h-screen w-full bg-cover bg-no-repeat flex flex-col container m-auto p-4 box-border'
        style={{ backgroundImage: `url(${bpCheckingImg})` }}
      >
        <div className='flex flex-col justify-start'>
          <h2 className='text-3xl lg:text-5xl text-main font-bold font-lobster my-8 tracking-widest'>
            Testimonials
          </h2>
          <hr className='w-20 mb-2 border-2 border-main' />
          <FaQuoteLeft className='text-7xl text-white mt-8 mb-0 mr-0' />
          <div className='mt-8 p-4 drop-shadow-xl glass'>
            <TestimonialCard />
          </div>
          <FaQuoteRight className='text-7xl text-white my-8 ml-auto mr-0' />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
