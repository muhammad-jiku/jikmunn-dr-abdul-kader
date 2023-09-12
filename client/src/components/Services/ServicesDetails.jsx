import React, { useEffect } from 'react';
// external imports
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// internal imports
import { CustomServiceCard } from '..';
import { allServices, clearErrors } from '../../actions/serviceActions';

const ServicesDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, services } = useSelector((state) => state?.services);

  useEffect(() => {
    dispatch(allServices());
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
      {services.map((service, idx) => (
        <CustomServiceCard key={idx} service={service} />
      ))}
    </div>
  );
};

export default ServicesDetails;
