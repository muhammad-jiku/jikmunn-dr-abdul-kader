import React, { useEffect } from 'react';
import { CustomServiceCard } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { allServices, clearErrors } from '../../actions/serviceActions';
import { toast } from 'react-toastify';

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
