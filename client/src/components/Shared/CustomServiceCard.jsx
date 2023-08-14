import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const CustomServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div className='m-4 bg-white drop-shadow-2xl'>
      <div
        className='h-64 w-full bg-cover bg-no-repeat opacity-80 relative'
        style={{ backgroundImage: `url(${service?.serviceImg?.url})` }}
      >
        <div className='absolute inset-x-0 bottom-[-35px]'>
          <h3 className='text-9xl text-main font-lobster text-center'>
            {service?.serviceID}
          </h3>
        </div>
      </div>
      <div className='flex flex-col items-center p-10'>
        <h2 className='text-xl md:text-2xl text-center my-2'>
          {service?.title}
        </h2>
        <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
        <div className='py-2 box-border'>
          <p className='text-gray text-justify my-2 text-sm md:text-lg'>
            {service?.desc}
          </p>
        </div>
        <button
          className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main my-2'
          onClick={() => navigate(`/services/${service?.title}`)}
        >
          Learn More <BsArrowRight className='ml-1 font-bold' />
        </button>
      </div>
    </div>
  );
};

export default CustomServiceCard;
