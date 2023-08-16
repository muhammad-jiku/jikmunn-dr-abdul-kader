import React, { useEffect, useState } from 'react';
import { CustomBanner } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, serviceDetails } from '../../actions/serviceActions';
import bgImg from '../../assets/images/bg2.jpg';
import { useParams } from 'react-router-dom';
import ServiceAppointmentBook from './ServiceAppointmentBook';

const ServiceDetailsInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const { title } = useParams();
  const dispatch = useDispatch();
  const { loading, error, service } = useSelector(
    (state) => state?.serviceDetailsInfo
  );

  useEffect(() => {
    dispatch(serviceDetails(title));
  }, [dispatch, title]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const bannerData = {
    heading: 'Our Services',
    subHeading1: 'All Services',
    subHeading2: `${service?.title}`,
    image: `${bgImg}`,
  };

  return (
    <>
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
            Sunday - Thursday: 09.30 am - 10.00 pm
          </h2>
          <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
            Saturday: 06.00 pm - 10.00 pm
          </h2>
          <button
            className='btn bg-main mt-4 text-white hover:bg-white hover:text-black hover:border-main mr-2 flex uppercase'
            onClick={() => setShowModal(true)}
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
      {/* Reviews */}
      <div className='container mx-auto my-4 py-2 w-full'>
        <h2 className='text-xl lg:text-3xl font-bold font-lobster text-main tracking-wider my-2 p-2'>
          Leave a comment
        </h2>
        <form className='flex flex-col items-start w-full'>
          <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
            <input
              type='text'
              placeholder='Name'
              className='input input-bordered w-full bg-white border-main m-2'
            />
            <input
              type='email'
              placeholder='Email'
              className='input input-bordered w-full bg-white border-main m-2'
            />
            <input
              type='tel'
              placeholder='Phone'
              className='input input-bordered w-full bg-white border-main m-2'
            />
          </div>
          <div className='flex flex-col justify-start items-start w-full'>
            <textarea
              className='textarea textarea-bordered textarea-lg bg-white border-main w-full mx-1 my-2'
              placeholder='Message'
            ></textarea>
            <button className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main mx-1 my-2'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceDetailsInfo;
