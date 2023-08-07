import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    await e.preventDefault();
    console.log(data);

    const passwordsData = {
      oldPassword,
      newPassword,
      passwordConfirm: confirmPassword,
    };

    console.log(passwordsData);
  };

  useEffect(() => {
    if (newPassword === confirmPassword && isSubmitSuccessful) {
      reset();
    }
  }, [newPassword, confirmPassword, isSubmitSuccessful, reset]);

  return (
    <div className='container mx-auto my-4 p-2 flex flex-col items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-2 mb-4'>
        Update Password
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* Previous Password */}
        <div className='relative'>
          <input
            type={showOldPassword ? 'text' : 'password'}
            placeholder='Previous Password'
            defaultValue={oldPassword}
            // onChange={(e) => setPassword(e.target.value)}
            {...register('oldPassword', {
              onChange: (e) => setOldPassword(e.target.value),
              required: {
                value: true,
                message: 'Please fill up the Previous Password field',
              },
              minLength: {
                value: 6,
                message:
                  'Previous Password field must contain at least six characters',
              },
            })}
            className='input input-bordered border-main w-full my-2'
          />
          <span
            className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 cursor-pointer'
            onClick={handleClickShowOldPassword}
          >
            {showOldPassword ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            )}
          </span>
        </div>
        {/* New Password */}
        <div className='relative'>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder='New Password'
            defaultValue={newPassword}
            // onChange={(e) => setPassword(e.target.value)}
            {...register('newPassword', {
              onChange: (e) => setNewPassword(e.target.value),
              required: {
                value: true,
                message: 'Please fill up the New Password field',
              },
              minLength: {
                value: 6,
                message:
                  'New Password field must contain at least six characters',
              },
            })}
            className='input input-bordered border-main w-full my-2'
          />
          <span
            className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 cursor-pointer'
            onClick={handleClickShowNewPassword}
          >
            {showNewPassword ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            )}
          </span>
        </div>
        {/* Confirm New Password */}
        <div className='relative'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm New Password'
            // value={confirmPassword}
            defaultValue={confirmPassword}
            {...register('confirmPassword', {
              onChange: (e) => setConfirmPassword(e.target.value),
              required: {
                value: true,
                message: 'Please fill up the Confirm Password field',
              },
              minLength: {
                value: 6,
                message:
                  'Confirm Password field must contain at least six characters',
              },
            })}
            className='input input-bordered border-main w-full my-2'
          />
          <span
            className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 cursor-pointer'
            onClick={handleClickShowConfirmPassword}
          >
            {showConfirmPassword ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            )}
          </span>
        </div>
        {/* Error messages */}{' '}
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.oldPassword?.type === 'required' && (
            <span>{errors?.oldPassword?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.oldPassword?.type === 'minLength' && (
            <span>{errors?.oldPassword?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.newPassword?.type === 'required' && (
            <span>{errors?.newPassword?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.newPassword?.type === 'minLength' && (
            <span>{errors?.newPassword?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.confirmPassword?.type === 'required' && (
            <span>{errors?.confirmPassword?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.confirmPassword?.type === 'minLength' && (
            <span>{errors?.confirmPassword?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {newPassword?.length === confirmPassword?.length
            ? newPassword !== confirmPassword && (
                <span>Ooops! Sorry password did not match</span>
              )
            : null}
        </p>
        <div className='form-control mt-6'>
          <input
            type='submit'
            className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
            value='update password'
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
