import React, { useEffect, useState } from 'react';
// external imports
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// internal import
import { clearErrors, forgetUserPassword } from '../../actions/authActions';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state?.password);

  const [email, setEmail] = useState('');

  const {
    register,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    await e.preventDefault();
    const emailData = {
      email,
    };

    if (email?.length > 0) {
      await dispatch(forgetUserPassword(emailData));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && message) {
      // console.log(message);
      toast.success(message);
      setTimeout(() => {
        reset({
          ...getValues(),
          review: '',
        });
      }, 2500);
    }
  }, [isSubmitSuccessful, message, reset, getValues]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Invalid Email!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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
            type='email'
            placeholder='Email'
            defaultValue={email}
            // onChange={(e) => setPassword(e.target.value)}
            {...register('email', {
              onChange: (e) => setEmail(e.target.value),
              required: {
                value: true,
                message: 'Please fill up the email field',
              },
            })}
            className='input input-bordered bg-white border-main w-full my-2'
          />

          {/* Error messages */}
          <p className='my-2 text-sm text-red-500 font-semibold'>
            {errors?.email?.type === 'required' && (
              <span>{errors?.email?.message}</span>
            )}
          </p>

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

export default ForgetPassword;
