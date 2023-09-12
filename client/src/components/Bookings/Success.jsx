import React from 'react';
// external imports
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className='p-2 min-h-screen flex flex-col justify-center items-center'>
      <div className='p-2 flex justify-center items-center'>
        <FiCheckCircle className='mr-1 text-7xl sm:text-5xl' />
        <h2 className='text-lg sm:text-xl lg:text-3xl'>
          Your appointment has been booked successfully{' '}
        </h2>
      </div>
      <div className='p-2 text-md sm:text-lg lg:text-xl'>
        <Link
          to={'/dashboard/me/appointments'}
          className='text-main no-underline'
        >
          View Appointments
        </Link>
      </div>
    </div>
  );
};

export default Success;
