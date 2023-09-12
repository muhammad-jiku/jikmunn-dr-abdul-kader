import React, { useEffect, useState } from 'react';
// external imports
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// internal imports
import { CustomBanner } from '..';
import { MetaDataTitle } from '../../utils';
import bgImg from '../../assets/images/bg2.jpg';
import ServiceTestimonial from './ServiceTestimonial';
import ServiceAppointmentBook from './ServiceAppointmentBook';
import { clearErrors, serviceDetails } from '../../actions/serviceActions';

const ServiceDetailsInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const { title } = useParams();
  const dispatch = useDispatch();
  const { loading, error, service } = useSelector(
    (state) => state?.serviceDetailsInfo
  );
  const {
    isAuthenticated,
    user,
    error: userError,
  } = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(serviceDetails(title));
  }, [dispatch, title]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (userError) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error, userError]);

  const bannerData = {
    heading: 'Our Services',
    subHeading1: 'All Services',
    subHeading2: `${service?.title}`,
    image: `${bgImg}`,
  };

  return (
    <>
      <MetaDataTitle title={`${service?.title} - Dr. Abdul Kader`} />
      <CustomBanner data={bannerData} />
      {console.log(service)}

      <div
        className={
          'min-h-screen container mx-auto my-2 p-10 flex flex-col justify-center items-center'
        }
      >
        <img
          loading='lazy'
          src={service?.serviceImg?.url}
          alt={service?.title}
          className='w-full lg:w-1/2 my-4'
        />
        <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider my-2'>
          Our Service Process
        </h2>
        <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
        <h2 className='text-lg lg:text-xl text-justify text-gray my-2'>
          {service?.desc}
        </h2>
        <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
        <div className='container mx-auto my-6 flex flex-col justify-center items-center'>
          <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider my-2'>
            Appointment time
          </h2>
          <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
            Sun - Thu: 04.00 pm - 08.00 pm
          </h2>
          <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
            Saturday: 07.00 pm - 10.00 pm
          </h2>
          <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
            Friday: Closed
          </h2>
          <button
            className='btn bg-main mt-4 text-white hover:bg-white hover:text-black hover:border-main mr-2 flex uppercase'
            onClick={() => setShowModal(true)}
            disabled={!isAuthenticated || user?.role === 'Admin'}
          >
            book Appointment
          </button>
        </div>
        {showModal ? (
          <ServiceAppointmentBook
            service={service}
            setShowModal={setShowModal}
          />
        ) : null}
      </div>
      {/* Testimonials */}
      {isAuthenticated && user?.role === 'User' && <ServiceTestimonial />}
    </>
  );
};

export default ServiceDetailsInfo;
