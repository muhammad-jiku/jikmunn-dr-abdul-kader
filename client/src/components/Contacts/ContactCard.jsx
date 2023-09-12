import React from 'react';
// external import
import { BsArrowRight } from 'react-icons/bs';

const ContactCard = ({ contact }) => {
  return (
    <div className='m-4 p-10 bg-white'>
      <div className='flex flex-col items-center'>
        <img
          src={contact?.image}
          alt={contact?.name}
          className='rounded-xl h-24 w-24'
        />
        <h2 className='text-xl md:text-2xl text-center my-2'>
          {contact?.name}
        </h2>{' '}
        <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
        <div className='py-2 box-border'>
          <p className='text-gray text-justify my-2 text-sm md:text-md hover:bg-white hover:text-main'>
            {contact?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
