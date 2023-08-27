import React from 'react';
import { useSelector } from 'react-redux';
import BookingCard from './BookingCard';
import { FaArrowRightLong } from 'react-icons/fa6';

const Bookings = () => {
  const { bookingItems } = useSelector((state) => state.booking);

  const checkOutHandler = () => {};

  return (
    <>
      {console.log(bookingItems)}
      {bookingItems?.length !== 0 ? (
        <div
          className='p-2 div-border flex 
            flex-col 
            justify-center 
            items-center 
            min-h-screen'
        >
          <div
            className='px-2 mb-2 border-b-2 border-main 
              w-auto md:w-[80%]'
          >
            <h2 className='my-2 text-main text-2xl lg:text-4xl text-center font-lobster font-bold'>
              Your Booking {bookingItems?.length === 1 ? 'List' : 'Lists'}
            </h2>
          </div>

          {bookingItems &&
            bookingItems.map((item) => (
              <div key={item?.product}>
                <BookingCard item={item} />
              </div>
            ))}

          <div className='my-1 flex flex-col md:flex-row justify-between items-center'>
            <div className='p-2 text-lg font-bold'>
              <h2 className='text-lg'>Gross Total: </h2>
              <h2 className='text-lg'>
                {` $${bookingItems.reduce((acc, item) => acc + item?.fee, 0)}`}
              </h2>
            </div>
            <div>
              <button
                className='btn p-2 text-white bg-main hover:text-main hover:bg-white border-[1px] border-main rounded uppercase'
                onClick={checkOutHandler}
              >
                Check Out <FaArrowRightLong className='ml-1' />
              </button>
            </div>
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
