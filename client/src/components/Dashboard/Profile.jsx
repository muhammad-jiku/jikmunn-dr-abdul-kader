import React, { useEffect, useState } from 'react';
// external imports
import { useForm } from 'react-hook-form';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// internal imports
import {
  loadUser,
  updateUserProfile,
  clearErrors,
} from '../../actions/authActions';
import profileImg from '../../assets/images/default_profile_avatar.png';
import { UPDATE_PROFILE_RESET } from '../../constants/authConstant';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state?.user
  );
  const {
    error: updateError,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState(
    user?.avatar?.url?.length > 0 ? user?.avatar?.url : `${profileImg}`
  );
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url?.length > 0 ? user?.avatar?.url : `${profileImg}`
  );
  const [username, setUsername] = useState(user ? user?.username : '');
  // const [email, setEmail] = useState(user ? user?.email : '');
  const [phone, setPhone] = useState(user ? user?.phone : '');
  const [country, setCountry] = useState(user ? user?.country : '');
  const [state, setState] = useState(user ? user?.state : '');
  const [city, setCity] = useState(user ? user?.city : '');
  const [address, setAddress] = useState(user ? user?.address : '');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    // reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const handleAvatar = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader?.result);
          setAvatar(reader?.result);
        }
      };
    } else {
      console.error('The selected file is not a valid Blob object.');
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const updatedData = {
      avatar,
      username,
      // email: user?.email,
      phone,
      country,
      state,
      city,
      address,
    };

    console.log(updatedData);
    await dispatch(updateUserProfile(updatedData));
  };

  useEffect(() => {
    if (isSubmitSuccessful && isUpdated) {
      toast.success('Your profile has been updated!!');
      dispatch(loadUser());
      navigate('/dashboard');
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [isSubmitSuccessful, isUpdated, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (updateError) {
      toast.error(updateError);
      clearErrors();
    }
  }, [error, updateError]);

  return (
    <div className='container mx-auto my-4 p-2 flex flex-col items-center'>
      <div className='flex flex-col items-center my-4'>
        <img
          loading='lazy'
          className='w-32 h-32 rounded-full border-[1px] border-main'
          src={
            user?.avatar?.url?.length > 0
              ? user?.avatar?.url
              : avatarPreview
              ? avatarPreview
              : profileImg
          }
          alt={user?.username}
        />
      </div>
      <h2 className='text-md md:text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        Joined On: {String(user?.createdAt).substr(0, 10)}
      </h2>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-2 mb-4'>
        My Profile
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          type='text'
          placeholder='Username'
          // value={username}
          defaultValue={username}
          {...register('username', {
            onChange: (e) => setUsername(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the Username field',
            },
            minLength: {
              value: 3,
              message: 'Username must be at least three characters',
            },
          })}
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

        {/* Phone */}
        <input
          type='tel'
          placeholder='Phone'
          // value={user?.phone}
          defaultValue={phone}
          {...register('phone', {
            onChange: (e) => setPhone(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the Phone field',
            },
            minLength: {
              value: 5,
              message: 'Invalid Phone number length',
            },
            maxLength: {
              value: 14,
              message: 'Invalid Phone number length',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Country */}
        <select
          // label={'Country'}
          // value={user?.country}
          defaultValue={country}
          className='select bg-white border-main w-full my-2'
          {...register('country', {
            onChange: (e) => setCountry(e.target.value),
            required: {
              value: true,
              message: 'Please Select your country',
            },
            minLength: {
              value: 2,
              message: 'Invalid Country Selection',
            },
            maxLength: {
              value: 100,
              message: 'Invalid Country Selection',
            },
          })}
        >
          {Country &&
            Country.getAllCountries().map((item) => (
              <option
                key={item?.isoCode}
                value={item?.isoCode}
                // label={'Country'}
                placeholder={'Country'}
              >
                {item?.name}
              </option>
            ))}
        </select>

        {/* State */}
        {country && (
          <select
            // label={'State'}
            placeholder={'State'}
            // value={user?.state}
            defaultValue={state}
            className='select bg-white border-main w-full my-2'
            {...register('state', {
              onChange: (e) => setState(e.target.value),
              required: {
                value: true,
                message: 'Please Select the state of your country',
              },
              minLength: {
                value: 1,
                message: 'Invalid State Selection',
              },
              maxLength: {
                value: 100,
                message: 'Invalid State Selection',
              },
            })}
          >
            {/* {console.log(country)} */}
            {State?.getStatesOfCountry(country).map((item) => (
              <option
                key={item?.isoCode}
                value={item?.isoCode}
                // label={'State'}
                placeholder={'State'}
              >
                {/* {console.log(item?.name)}
                {console.log(item?.isoCode)} */}
                {item?.name}
              </option>
            ))}
          </select>
        )}

        {/* City */}
        <input
          type='text'
          placeholder='City'
          // value={user?.city}
          defaultValue={city}
          {...register('city', {
            onChange: (e) => setCity(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the City field',
            },
            minLength: {
              value: 2,
              message: 'City must be at least two characters',
            },
            maxLength: {
              value: 100,
              message: 'City must be not exceed hundred characters',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Address */}
        <input
          type='text'
          placeholder='Address'
          // value={user?.address}
          defaultValue={address}
          {...register('address', {
            onChange: (e) => setAddress(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the Address field',
            },
            minLength: {
              value: 10,
              message: 'Address must be at least ten characters',
            },
            maxLength: {
              value: 100,
              message: 'Address must be not exceed hundred characters',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Avatar */}
        <div className='flex items-center justify-center w-full my-2'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-main border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-8 h-8 mb-4 text-gray'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
              </svg>
              <p className='mb-2 text-xs sm:text-sm text-gray'>
                <span className='font-semibold'>Click to upload Avatar </span>{' '}
                or drag and drop
              </p>
              <p className='text-xs text-gray'>SVG, PNG, JPG or JPEG</p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              className='hidden'
              onChange={handleAvatar}
            />
          </label>
        </div>

        {/* Error messages */}
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.username?.type === 'required' && (
            <span>{errors?.username?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.username?.type === 'minLength' && (
            <span>{errors?.username?.message}</span>
          )}
        </p>
        {/* <p className='my-2 text-sm text-red-500 font-semibold'>
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
          {errors?.phone?.type === 'required' && (
            <span>{errors?.phone?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.phone?.type === 'minLength' && (
            <span>{errors?.phone?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.phone?.type === 'maxLength' && (
            <span>{errors?.phone?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.country?.type === 'required' && (
            <span>{errors?.country?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.country?.type === 'minLength' && (
            <span>{errors?.country?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.country?.type === 'maxLength' && (
            <span>{errors?.country?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.state?.type === 'required' && (
            <span>{errors?.state?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.state?.type === 'minLength' && (
            <span>{errors?.state?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.state?.type === 'maxLength' && (
            <span>{errors?.state?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.city?.type === 'required' && (
            <span>{errors?.city?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.city?.type === 'minLength' && (
            <span>{errors?.city?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.city?.type === 'maxLength' && (
            <span>{errors?.city?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.address?.type === 'required' && (
            <span>{errors?.address?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.address?.type === 'minLength' && (
            <span>{errors?.address?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.address?.type === 'maxLength' && (
            <span>{errors?.address?.message}</span>
          )}
        </p>
        <div className='form-control mt-6'>
          <input
            type='submit'
            className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
            value='update profile'
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
