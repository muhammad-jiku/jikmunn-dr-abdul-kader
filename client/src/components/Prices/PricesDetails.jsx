import React, { useEffect } from 'react';
// external imports
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// internal imports
import { CustomPriceCard } from '..';
import { allPrices, clearErrors } from '../../actions/priceActions';

const PricesDetails = () => {
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
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
      {prices.map((price, idx) => (
        <CustomPriceCard key={idx} price={price} />
      ))}
    </div>
  );
};

export default PricesDetails;
