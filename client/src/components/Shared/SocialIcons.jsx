import React from 'react';
// external imports
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <>
      <a
        href='https://www.facebook.com/ak.pin2'
        target='_blank'
        rel='noopener noreferrer'
      >
        <button className='btn btn-circle btn-sm md:btn-md mr-2 bg-[#DEE4E7] text-black hover:bg-main hover:text-white'>
          <FaFacebookF className='text-lg md:text-2xl' />
        </button>
      </a>
      <a
        href='https://www.instagram.com/abdulkaderpintu/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <button className='btn btn-circle btn-sm md:btn-md mr-2 bg-[#DEE4E7] text-black hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:text-white'>
          <FaInstagram className='text-lg md:text-2xl' />
        </button>
      </a>
      <a
        href='https://www.linkedin.com/in/dr-abdul-kader-3297b3124/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <button className='btn btn-circle btn-sm md:btn-md mr-2 bg-[#DEE4E7] text-black hover:bg-info hover:text-white'>
          <FaLinkedinIn className='text-lg md:text-2xl' />
        </button>
      </a>
    </>
  );
};

export default SocialIcons;
