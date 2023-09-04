import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className='p-2 min-h-screen flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center'>
        <FiCheckCircle className='mr-1 text-xl lg:text-3xl' />
        <h2 className='text-xl lg:text-3xl'>
          Your appointment has been booked successfully{' '}
        </h2>
      </div>
      <div className='p-2 text-lg lg:text-xl'>
        <Link
          to={'/dashboard/me/appointments'}
          className='text-red-900 no-underline'
        >
          View Appointments
        </Link>
      </div>
    </div>
  );
};

export default Success;
