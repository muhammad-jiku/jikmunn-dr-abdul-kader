import React, { useEffect, useState } from 'react';
// external imports
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// internal imports
import {
  adminAddNewPrice,
  clearErrors,
} from '../../../../actions/priceActions';
import { ADMIN_NEW_PRICE_RESET } from '../../../../constants/priceConstant';

const NewPrice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state?.newPrice);

  const [priceID, setPriceID] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [price, setPrice] = useState('');
  const [priceImg, setPriceImg] = useState('');
  const [priceImgPreview, setPriceImgPreview] = useState('');
  const [selectImg, setSelectImg] = useState(false);
  const [diagnosticLists, setDiagnosticLists] = useState([]);

  const diagnostics = [
    'Medical History',
    'Physical Exam',
    'Diagnosis & Prescription',
  ];

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const handlePriceImg = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectImg(true);
          setPriceImgPreview(reader?.result);
          setPriceImg(reader?.result);
        }
      };
    } else {
      console.error('The selected file is not a valid Blob object.');
    }
  };

  const handleClosePriceImg = (e) => {
    e.preventDefault();

    setSelectImg(false);
    setPriceImg('');
    setPriceImgPreview('');
  };

  const handleDiagnosticsChange = (e) => {
    let diagnosticsArray = [...diagnosticLists];
    if (e.target.checked) {
      diagnosticsArray = [...diagnosticLists, e.target.value];
    } else {
      diagnosticsArray.splice(diagnosticLists.indexOf(e.target.value), 1);
    }
    setDiagnosticLists(diagnosticsArray);
  };

  const onSubmit = async (data, e) => {
    console.log(data);
    e.preventDefault();

    const priceInfo = {
      priceID,
      title,
      subTitle,
      price,
      diagnostics: diagnosticLists,
      priceImg,
    };

    console.log(priceInfo);
    if (
      selectImg &&
      priceImg?.length > 0 &&
      priceImgPreview?.length > 0 &&
      diagnosticLists?.length === 3
    ) {
      await dispatch(adminAddNewPrice(priceInfo));
    }
  };

  useEffect(() => {
    if (
      selectImg &&
      priceImg?.length > 0 &&
      priceImgPreview?.length > 0 &&
      diagnosticLists?.length === 3 &&
      success &&
      isSubmitSuccessful
    ) {
      reset();
      toast.success('New Price Added Successfully!');
      navigate('/dashboard/admin/prices');
      dispatch({
        type: ADMIN_NEW_PRICE_RESET,
      });
    }
  }, [
    dispatch,
    reset,
    navigate,
    selectImg,
    priceImg,
    priceImgPreview,
    diagnosticLists,
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
        Add New Price
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* ID */}
        <input
          type='number'
          placeholder='Price ID'
          defaultValue={priceID}
          {...register('priceID', {
            onChange: (e) => setPriceID(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the Price ID field',
            },
            minLength: {
              value: 1,
              message: 'Invalid Price ID field',
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

        {/* Subtitle */}
        <input
          type='text'
          placeholder='Sub-Title'
          defaultValue={subTitle}
          {...register('subTitle', {
            onChange: (e) => setSubTitle(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the sub-title field',
            },
            minLength: {
              value: 5,
              message: 'Sub-Title must be at least 5 characters',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Price */}
        <input
          type='number'
          placeholder='Price'
          defaultValue={price}
          {...register('price', {
            onChange: (e) => setPrice(e.target.value),
            required: {
              value: true,
              message: 'Please fill up the price tag field',
            },
            minLength: {
              value: 1,
              message: 'Invalid Price tag field',
            },
          })}
          className='input input-bordered bg-white border-main w-full my-2'
        />

        {/* Diagnostics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 container mx-auto my-10'>
          {diagnostics.map((d, i) => {
            return (
              <label key={i} className='flex justify-center' htmlFor={d}>
                <input
                  type='checkbox'
                  className='checkbox border-main'
                  id={d}
                  value={d}
                  onChange={handleDiagnosticsChange}
                />
                <span className='ml-2'>{d}</span>
              </label>
            );
          })}
        </div>

        {selectImg ? (
          <div className='relative w-full'>
            <img src={priceImgPreview} alt='Price Preview' className='' />
            <button
              className='absolute top-[-10px] right-0 w-10 h-10 rounded-full border-[1px] border-main p-1 bg-white text-black'
              onClick={handleClosePriceImg}
            >
              X
            </button>
          </div>
        ) : null}

        {/* Price Image */}
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
              onChange={handlePriceImg}
            />
          </label>
        </div>

        {/* Error messages */}
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.priceID?.type === 'required' && (
            <span>{errors?.priceID?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.priceID?.type === 'minLength' && (
            <span>{errors?.priceID?.message}</span>
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
          {errors?.subTitle?.type === 'required' && (
            <span>{errors?.subTitle?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.subTitle?.type === 'minLength' && (
            <span>{errors?.subTitle?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.price?.type === 'required' && (
            <span>{errors?.price?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {errors?.price?.type === 'minLength' && (
            <span>{errors?.price?.message}</span>
          )}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {diagnosticLists?.length !== 3 ? (
            <span>You must select all the diagnosis process!</span>
          ) : null}
        </p>
        <p className='my-2 text-sm text-red-500 font-semibold'>
          {!selectImg &&
          priceImg?.length === 0 &&
          priceImgPreview?.length === 0 ? (
            <span>You must select an image!</span>
          ) : null}
        </p>
        <div className='form-control mt-6'>
          <input
            type='submit'
            className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
            value='add new price'
          />
        </div>
      </form>
    </div>
  );
};

export default NewPrice;
