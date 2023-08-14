import React, { useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CustomServiceCard } from '../../';
import { useDispatch, useSelector } from 'react-redux';
import { allServices, clearErrors } from '../../../actions/serviceActions';
import { toast } from 'react-toastify';

const Services = () => {
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
    <div className='container mx-auto my-10 min-h-screen mb-4 mt-96 sm:mt-72 lg:mt-48 p-3 flex flex-col justify-center items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
        Services
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        ambulant clinic & emergency
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
        {services.slice(0, 3).map((service, index) => (
          <CustomServiceCard key={index} service={service} />
        ))}
      </div>
      <Link to={'/services'}>
        <h2 className='text-lg lg:text-xl text-gray font-bold my-2 flex justify-center items-center'>
          <span>View All Services</span>
          <BsArrowRight className='ml-2 font-bold' />
        </h2>
      </Link>
    </div>
  );
};

export default Services;
