import React from 'react';
// external imports
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// internal import
import { removeBookingItem } from '../../actions/bookingActions';

const BookingCard = ({ item }) => {
  const dispatch = useDispatch();

  const deleteBookingItem = (id) => {
    dispatch(removeBookingItem(id));
  };

  return (
    <>
      {/*  Desktop View */}
      <div className='my-2 hidden md:flex justify-between items-center rounded shadow-xl'>
        <div className='p-2 box-border flex justify-between items-center'>
          <img src={item?.image} alt={item?.title} className='h-48' />
          <div className='m-2 flex flex-col items-start box-border'>
            <Link
              to={`/services/${item?.title}`}
              className='mt-2 mb-1 text-main text-xl no-underline'
            >
              {item?.title}
            </Link>
            <h2 className='text-sm mb-1 text-gray no-underline'>
              Fee: ${item?.fee}
            </h2>
            <h2 className='text-sm mb-1 text-gray no-underline'>
              Date: {item?.date}
            </h2>
            <h2 className='text-sm mb-1 text-gray no-underline'>
              Time: {item?.meetingTime}
            </h2>
          </div>
        </div>
        <div className='p-6 flex justify-center items-center'>
          <button
            className='btn mx-2 px-3 py-0 text-white bg-main hover:text-main hover:bg-white border-[1px] border-main hover:border-main'
            onClick={() => deleteBookingItem(item?.service)}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className='my-2 box-border flex flex-col justify-center items-center md:hidden rounded shadow-lg w-72 sm:w-96'>
        <div
          className='h-64 w-full bg-cover bg-no-repeat'
          style={{ backgroundImage: `url(${item?.image})` }}
        ></div>
        <div className='my-4 flex flex-col items-start'>
          <Link
            to={`/services/${item?.title}`}
            className='mt-2 mb-1 text-xl text-main no-underline'
          >
            {item?.title}
          </Link>
          <h2 className='mb-1 text-lg text-gray'>Fee: ${item?.fee}</h2>
          <h2 className='mb-1 text-lg text-gray'>Date: {item?.date}</h2>
          <h2 className='mb-1 text-lg text-gray'>Time: {item?.meetingTime}</h2>
        </div>
        <button
          className='btn mt-4 px-2 py-1 w-full text-white bg-main hover:text-main hover:bg-white border-[1px] border-main hover:border-main rounded uppercase'
          onClick={() => deleteBookingItem(item?.service)}
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default BookingCard;
