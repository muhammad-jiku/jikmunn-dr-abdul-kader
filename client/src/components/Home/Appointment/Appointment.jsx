import React from 'react';
import { IoCall } from 'react-icons/io5';
import appointmentImg from '../../../assets/images/appointment.jpg';

const Appointment = () => {
  return (
    <div
      className={`hero min-h-screen bg-cover bg-no-repeat w-full flex flex-col opacity-70`}
      style={{ backgroundImage: `url(${appointmentImg})` }}
    >
      <div className='container m-auto flex flex-col lg:flex-row justify-center lg:justify-around items-center box-border'>
        <div className='flex justify-center items-center container mx-auto p-10 box-border'>
          <IoCall className='text-white text-5xl lg:text-7xl' />
          <div className='flex flex-col justify-start items-start box-border'>
            <h2 className='text-2xl lg:text-3xl text-white font-lobster tracking-wide lg:tracking-widest'>
              +880 183 227 8260
            </h2>
            <h2 className='text-lg lg:text-xl text-white font-lobster tracking-wide lg:tracking-widest'>
              Call me to get emergency help
            </h2>
          </div>
        </div>

        <div className='container mx-auto p-4 lg:p-10'>
          <div className='p-10 bg-white drop-shadow-2xl box-borde'>
            <div className='flex flex-col'>
              <h2 className='text-3xl sm:text-5xl lg:text-7xl text-main font-extrabold font-lobster tracking-wide lg:tracking-widest my-2'>
                Appointment
              </h2>
              <h2 className='text-lg lg:text-xl font-semibold text-gray mb-2 font-oswald tracking-widest'>
                don’t waste your time, make it online
              </h2>
              <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
              <div className='py-2 my-4 w-full'>
                <form className='flex flex-col items-start'>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
