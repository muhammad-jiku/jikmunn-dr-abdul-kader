import React, { useEffect, useState } from 'react';
import { CustomBanner } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, serviceDetails } from '../../actions/serviceActions';
import bgImg from '../../assets/images/bg2.jpg';
import { useParams } from 'react-router-dom';

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
          <>
            <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur'>
              <div className='relative w-full lg:w-2/3 my-6 mx-auto'>
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t '>
                    <h3 className='text-3xl font=semibold'>General Info</h3>
                    <button
                      className='bg-transparent border-0 text-black float-right'
                      onClick={() => setShowModal(false)}
                    >
                      <span className='text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full'>
                        x
                      </span>
                    </button>
                  </div>
                  <div className='relative p-6 flex-auto'>
                    <form className='bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full'>
                      <label className='block text-black text-sm font-bold mb-1'>
                        First Name
                      </label>
                      <input className='shadow appearance-none border rounded w-full py-2 px-1 text-black' />
                      <label className='block text-black text-sm font-bold mb-1'>
                        Last Name
                      </label>
                      <input className='shadow appearance-none border rounded w-full py-2 px-1 text-black' />
                      <label className='block text-black text-sm font-bold mb-1'>
                        Address
                      </label>
                      <input className='shadow appearance-none border rounded w-full py-2 px-1 text-black' />
                      <label className='block text-black text-sm font-bold mb-1'>
                        City
                      </label>
                      <input className='shadow appearance-none border rounded w-full py-2 px-1 text-black' />
                    </form>
                  </div>
                  <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className='text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
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
