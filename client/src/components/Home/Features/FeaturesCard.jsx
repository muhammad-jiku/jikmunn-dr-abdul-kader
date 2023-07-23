import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

const FeaturesCard = ({ feature }) => {
  return (
    <div className='m-4 p-10 bg-white drop-shadow-2xl'>
      <div className='flex flex-col items-center'>
        <img
          src={feature?.image}
          alt={feature?.name}
          className='rounded-xl h-24 w-24'
        />
        <h2 className='text-xl md:text-2xl text-center my-2'>
          {feature?.name}
        </h2>{' '}
        <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
        <div className='py-2 box-border'>
          <p className='text-gray text-justify my-2 text-sm md:text-lg'>
            {feature?.description}
          </p>
        </div>
        <button className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main my-2'>
          Learn More <BsArrowRight className='ml-1 font-bold' />
        </button>
      </div>
    </div>
  );
};

export default FeaturesCard;
