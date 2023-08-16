import React from 'react';

const ServiceReview = () => {
  return (
    <>
      <div className='container mx-auto my-4 p-6 lg:p-10 w-full'>
        <h2 className='text-2xl lg:text-4xl font-bold font-lobster text-main tracking-wider my-2 p-2'>
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

export default ServiceReview;
