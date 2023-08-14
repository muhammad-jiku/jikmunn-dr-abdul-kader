import React from 'react';
import { TiTick } from 'react-icons/ti';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const CustomPriceCard = ({ price }) => {
  const navigate = useNavigate();
  return (
    <div className='m-4 bg-white drop-shadow-2xl'>
      <div
        className='h-64 w-full bg-cover bg-no-repeat opacity-70 relative'
        style={{ backgroundImage: `url(${price?.priceImg?.url})` }}
      >
        <div className='absolute inset-x-0 bottom-[-10px]'>
          <h3 className='text-5xl text-main font-lobster text-center'>
            {price?.price !== 0 ? '$' + price?.price : price?.subTitle}
          </h3>
        </div>
      </div>
      <div className='flex flex-col items-center p-10'>
        <h2 className='text-xl md:text-2xl text-center my-2'>{price?.title}</h2>
        <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
        <div className='py-2 box-border'>
          {price?.diagnostics?.map((d, i) => (
            <p
              className='text-gray text-justify my-2 text-sm md:text-lg flex justify-center items-center'
              key={i}
            >
              {' '}
              <TiTick className='mr-2' /> <span> {d}</span>
            </p>
          ))}
        </div>
        <button
          className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main my-2'
          onClick={() => navigate('/services')}
        >
          Appointment <BsArrowRight className='ml-1 font-bold' />
        </button>
      </div>
    </div>
  );
};

export default CustomPriceCard;
