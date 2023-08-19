import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  adminAddNewService,
  clearErrors,
} from '../../../../actions/serviceActions';
import { toast } from 'react-toastify';
import { ADMIN_NEW_SERVICE_RESET } from '../../../../constants/serviceConstant';

const NewService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state?.newService);

  const [serviceID, setServiceID] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [serviceImg, setServiceImg] = useState('');
  const [serviceImgPreview, setServiceImgPreview] = useState('');
  const [selectImg, setSelectImg] = useState(false);
  const [slotTimes, setSlotTimes] = useState([]);

  const slots = [
    // // morning
    // '09:30 AM - 10:00 AM',
    // '10:00 AM - 10:30 AM',
    // '10:30 AM - 11:00 AM',
    // '11:00 AM - 11:30 AM',
    // // noon
    // '11:30 AM - 12:00 PM',
    // '12:00 PM - 12:30 PM',
    // '12:30 PM - 01:00 PM',
    // '01:00 PM - 01:30 PM',
    // // afternoon
    // '03:00 PM - 03:30 PM',
    // '03:30 PM - 04:00 PM',
    '04:00 PM - 04:30 PM',
    '04:30 PM - 05:00 PM',
    // evening
    '05:00 PM - 05:30 PM',
    '05:30 PM - 06:00 PM',
    '06:00 PM - 06:30 PM',
    '06:30 PM - 07:00 PM',
    // night
    '07:00 PM - 07:30 PM',
    '07:30 PM - 08:00 PM',
    '08:00 PM - 08:30 PM',
    '08:30 PM - 09:00 PM',
    '09:00 PM - 09:30 PM',
    '09:30 PM - 10:00 PM',
  ];

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const handleServiceImg = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectImg(true);
          setServiceImgPreview(reader?.result);
          setServiceImg(reader?.result);
        }
      };
    } else {
      console.error('The selected file is not a valid Blob object.');
    }
  };

  const handleCloseServiceImg = (e) => {
    e.preventDefault();

    setSelectImg(false);
    setServiceImg('');
    setServiceImgPreview('');
  };

  const handleSlotsChange = (e) => {
    let slotsArray = [...slotTimes];
    if (e.target.checked) {
      slotsArray = [...slotTimes, e.target.value];
    } else {
      slotsArray.splice(slotTimes.indexOf(e.target.value), 1);
    }
    setSlotTimes(slotsArray);
  };

  const onSubmit = async (data, e) => {
    console.log(data);
    e.preventDefault();

    const serviceInfo = {
      serviceID,
      title,
      desc,
      slots: slotTimes,
      serviceImg,
    };

    console.log(serviceInfo);
    if (
      selectImg &&
      serviceImg?.length > 0 &&
      serviceImgPreview?.length > 0 &&
      slotTimes?.length > 0
    ) {
      await dispatch(adminAddNewService(serviceInfo));
    }
  };

  useEffect(() => {
    if (
      selectImg &&
      serviceImg?.length > 0 &&
      serviceImgPreview?.length > 0 &&
      slotTimes?.length > 0 &&
      success &&
      isSubmitSuccessful
    ) {
      reset();
      toast.success('New Service Added Successfully!');
      navigate('/dashboard/admin/services');
      dispatch({
        type: ADMIN_NEW_SERVICE_RESET,
      });
    }
  }, [
    dispatch,
    reset,
    navigate,
    selectImg,
    serviceImg,
    serviceImgPreview,
    slotTimes,
    success,
    isSubmitSuccessful,
  ]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  return (
    <div className='container mx-auto my-4 p-2 flex flex-col items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-2 mb-4'>
        Add New Service
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* Service ID */}
        <input
          type='number'
          placeholder='Service ID'
          defaultValue={serviceID}
          {...register('serviceID', {
            onChange: (e) => setServiceID(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the ID field',
            },
            minLength: {
              value: 1,
              message: 'Invalid ID field',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Title */}
        <input
          type='text'
          placeholder='Title'
          defaultValue={title}
          {...register('title', {
            onChange: (e) => setTitle(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the title field',
            },
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Description */}
        <input
          type='text'
          placeholder='Description'
          defaultValue={desc}
          {...register('desc', {
            onChange: (e) => setDesc(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the Description field',
            },
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Slots */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto my-10'>
          {slots.map((slot, i) => {
            return (
              <label key={i} className='flex justify-center' htmlFor={slot}>
                <input
                  type='checkbox'
                  className='checkbox border-main'
                  id={slot}
                  value={slot}
                  onChange={handleSlotsChange}
                />
                <span className='ml-2'>{slot}</span>
              </label>
            );
          })}
        </div>

        {selectImg ? (
          <div className='relative w-full'>
            <img src={serviceImgPreview} alt='Service Preview' className='' />
            <button
              className='absolute top-[-10px] right-0 w-10 h-10 rounded-full border-[1px] border-main p-1 bg-white text-black'
              onClick={handleCloseServiceImg}
            >
              X
            </button>
          </div>
        ) : null}

        {/* Service Image */}
        <div className='flex items-center justify-center w-full my-6'>
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
                <span className='font-semibold'>Click to upload image </span> or
                drag and drop
              </p>
              <p className='text-xs text-gray'>SVG, PNG, JPG or JPEG</p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              className='hidden'
              onChange={handleServiceImg}
            />
          </label>
        </div>

        {/* Error messages */}
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.serviceID?.type === 'required' && (
            <span>{errors?.serviceID?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.serviceID?.type === 'minLength' && (
            <span>{errors?.serviceID?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.title?.type === 'required' && (
            <span>{errors?.title?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.title?.type === 'minLength' && (
            <span>{errors?.title?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.desc?.type === 'required' && (
            <span>{errors?.desc?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.desc?.type === 'minLength' && (
            <span>{errors?.desc?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {slotTimes?.length < 1 ? (
            <span>You must select the slot time!</span>
          ) : null}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {!selectImg &&
          serviceImg?.length === 0 &&
          serviceImgPreview?.length === 0 ? (
            <span>You must select an image!</span>
          ) : null}
        </p>
        <div className='form-control mt-6'>
          <input
            type='submit'
            className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
            value='add new service'
          />
        </div>
      </form>
    </div>
  );
};

export default NewService;
