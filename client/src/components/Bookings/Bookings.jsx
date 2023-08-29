import React from 'react';
import { useSelector } from 'react-redux';
import BookingCard from './BookingCard';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate();

  const { bookingItems } = useSelector((state) => state.booking);

  const checkOutHandler = () => {
    navigate('/payment');
  };

  return (
    <>
      {console.log(bookingItems)}
      {bookingItems?.length !== 0 ? (
        <div className='p-2 box-border flex flex-col justify-center items-center min-h-screen'>
          <div className='px-2 mb-2 border-b-2 border-main'>
            <h2 className='my-2 text-main text-3xl lg:text-4xl text-center font-lobster font-bold'>
              Your Booking {bookingItems?.length === 1 ? 'List' : 'Lists'}
            </h2>
          </div>

          <div className='my-10 grid grid-cols-1 gap-2 md:gap-3'>
            {bookingItems &&
              bookingItems.map((item) => (
                <BookingCard key={item?.product} item={item} />
              ))}
          </div>

          <div className='my-4 p-2 lg:p-4 w-full flex justify-between items-center'>
            <h2 className='text-sm lg:text-lg'>
              Gross Total:{' '}
              {` $${bookingItems.reduce((acc, item) => acc + item?.fee, 0)}`}
            </h2>

            <h2
              className='text-sm lg:text-lg hover:text-main flex items-center cursor-pointer'
              onClick={checkOutHandler}
            >
              Check Out <FaArrowRightLong className='ml-2' />
            </h2>
          </div>
        </div>
      ) : (
        <div className='m-2 p-2 flex justify-center items-center min-h-screen font-bold'>
          <h2 className='text-lg text-error'>No meeting booked yet!</h2>
        </div>
      )}
    </>
  );
};

export default Bookings;
