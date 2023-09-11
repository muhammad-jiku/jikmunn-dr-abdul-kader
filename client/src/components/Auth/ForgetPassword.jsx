import React from 'react';
import { useForm } from 'react-hook-form';

const Payment = () => {
  const {
    // register,
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    await e.preventDefault();
    console.log(data);
  };

  return (
    <div className='container mx-auto my-4 lg:my-10 p-2 min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center'>
      <h2 className='text-2xl lg:text-3xl font-bold font-lobster text-main tracking-wider m-2'>
        Ooops! It seems you forget the password!
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-wider m-2'>
        Please write down your email to receive reset password email
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='container mx-auto my-10 p-2 flex flex-col items-center rounded-xl shadow-2xl w-11/12 lg:w-1/2'>
        <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <input
            placeholder='Email'
            className='my-2 input input-bordered bg-white border-main text-xl w-full'
          />

          <div className='form-control mt-2'>
            <input
              type='submit'
              className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
              value='Send'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
