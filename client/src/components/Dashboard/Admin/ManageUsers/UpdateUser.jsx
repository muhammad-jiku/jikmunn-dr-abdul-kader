import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  adminUpdateUser,
  adminUserDetails,
  clearErrors,
} from '../../../../actions/authActions';
import { toast } from 'react-toastify';
import { ADMIN_UPDATE_USER_ROLE_RESET } from '../../../../constants/authConstant';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state?.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state?.profile);

  const [userRole, setUserRole] = useState(user ? user?.role : '');

  const roles = ['User', 'Admin'];

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    // reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();

    const userInfo = {
      username: user?.username,
      email: user?.email,
      role: userRole,
    };

    console.log(id, userInfo);
    if (userRole?.length > 1) {
      dispatch(adminUpdateUser(id, userInfo));
    }
  };

  useEffect(() => {
    dispatch(adminUserDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isUpdated && isSubmitSuccessful) {
      toast.success('User Role Updated Successfully');
      navigate('/dashboard/admin/users');
      dispatch({
        type: ADMIN_UPDATE_USER_ROLE_RESET,
      });
    }
  }, [dispatch, isUpdated, isSubmitSuccessful, navigate]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (updateError) {
      // console.log(updateError);
      toast.error('Failed to update user role!');
      dispatch(clearErrors());
    }
  }, [dispatch, error, updateError]);

  return (
    <div className='container mx-auto my-4 p-2 flex flex-col items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-2 mb-4'>
        Update User Role
      </h2>
      {console.log(user)}
      {console.log(userRole)}
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          type='text'
          placeholder='Username'
          // value={username}
          defaultValue={user?.username}
          {...register('username', {
            //   onChange: (e) => setUsername(e.target.value),
            //   required: {
            //     value: true,
            //     message: 'Please fill up the Username field',
            //   },
            //   minLength: {
            //     value: 3,
            //     message: 'Username must be at least three characters',
            //   },
          })}
          disabled
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Email */}
        <input
          type='email'
          placeholder='Email'
          // value={email}
          defaultValue={user?.email}
          {...register('email', {
            // onChange: (e) => setEmail(e.target.value),
            // required: {
            //   value: true,
            //   message: 'Please fill up the Email field',
            // },
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid Email',
            // },
          })}
          disabled
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Role */}
        <select
          // label={'Country'}
          // value={user?.country}
          defaultValue={user?.role || userRole}
          className='select bg-white border-main w-full my-2'
          {...register('role', {
            onChange: (e) => setUserRole(e.target.value),
            required: {
              value: true,
              message: 'Please select user role',
            },
            minLength: {
              value: 4,
              message: 'Invalid user role selection',
            },
          })}
        >
          {roles.map((role, idx) => (
            <option
              key={idx}
              value={role}
              // label={'Country'}
              placeholder={'User Role'}
            >
              {role}
            </option>
          ))}
        </select>

        {/* Error messages */}
        {/*  <p className='my-2 text-sm text-red-500 font-semibold'>
            {errors?.username?.type === 'required' && (
              <span>{errors?.username?.message}</span>
            )}
          </p>
          <p className='my-2 text-sm text-red-500 font-semibold'>
            {errors?.username?.type === 'minLength' && (
              <span>{errors?.username?.message}</span>
            )}
          </p>
          <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.email?.type === 'required' && (
            <span>{errors?.email?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.email?.type === 'pattern' && (
            <span>{errors?.email?.message}</span>
          )}
        </p> */}

        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.role?.type === 'required' && (
            <span>{errors?.role?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.role?.type === 'minLength' && (
            <span>{errors?.role?.message}</span>
          )}
        </p>

        <div className='form-control mt-6'>
          <input
            type='submit'
            className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
            value='update'
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
