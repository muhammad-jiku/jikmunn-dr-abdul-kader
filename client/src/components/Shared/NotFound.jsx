import React from 'react';
// external import
import { useNavigate } from 'react-router-dom';
// internal import
import NotFoundImg from '../../assets/gifs/NotFound.gif';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='hero min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md container mx-auto flex flex-col items-center'>
          <img src={NotFoundImg} alt='not found' />
          <h1 className='text-3xl font-bold py-4'>Page is not found!</h1>
          <button
            className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main mr-2'
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
