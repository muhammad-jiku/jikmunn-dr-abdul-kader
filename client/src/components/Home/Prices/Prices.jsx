import React, { useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CustomPriceCard } from '../../';
import { useDispatch, useSelector } from 'react-redux';
import { allPrices, clearErrors } from '../../../actions/priceActions';
import { toast } from 'react-toastify';

const Prices = () => {
  const dispatch = useDispatch();
  const { loading, error, prices } = useSelector((state) => state?.prices);

  useEffect(() => {
    dispatch(allPrices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className='container mx-auto my-10 p-3 min-h-screen flex flex-col justify-center items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
        Prices & Insurance
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        fair prices for better quality
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
        {prices.map((price, idx) => (
          <CustomPriceCard key={idx} price={price} />
        ))}
      </div>
      <Link to={'/prices'}>
        <h2 className='text-lg lg:text-xl text-gray font-bold my-2 flex justify-center items-center'>
          <span>View All Prices</span>
          <BsArrowRight className='ml-2 font-bold' />
        </h2>
      </Link>
    </div>
  );
};

export default Prices;
