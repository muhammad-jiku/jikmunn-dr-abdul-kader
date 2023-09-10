import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addNewTestimonial,
  clearErrors,
} from '../../actions/testimonialActions';
import { ADD_TESTIMONIAL_RESET } from '../../constants/testimonialConstant';

const ServiceReview = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state?.newTestimonial);
  const [review, setReview] = useState('');

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
    e.preventDefault();

    const testimonialData = {
      testimonial: review,
    };

    if (review.length >= 5) {
      dispatch(addNewTestimonial(testimonialData));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && success) {
      toast.success(`Thanks for your feedback!`);
      setTimeout(() => {
        reset({
          ...getValues(),
          review: '',
        });
      }, 2500);
      dispatch({
        type: ADD_TESTIMONIAL_RESET,
      });
    }
  }, [dispatch, isSubmitSuccessful, success, reset, getValues]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <div className='container mx-auto my-4 p-6 lg:p-10 w-full'>
        <h2 className='text-2xl lg:text-4xl font-bold font-lobster text-main tracking-wider my-2 p-2'>
          Leave a comment
        </h2>
        <form
          className='flex flex-col items-start w-full'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col justify-start items-start w-full'>
            <textarea
              placeholder='Message'
              defaultValue={review}
              {...register('review', {
                onChange: (e) => setReview(e.target.value),
                required: {
                  value: true,
                  message: 'Please fill up the testimonial field',
                },
                minLength: {
                  value: 5,
                  message: 'Invalid testimonial field',
                },
              })}
              className='textarea textarea-bordered textarea-lg bg-white border-main w-full mx-1 my-2'
            />

            {/* Error messages */}
            <p className='my-2 text-sm text-red-500 font-semibold'>
              {errors?.review?.type === 'required' && (
                <span>{errors?.review?.message}</span>
              )}
            </p>
            <p className='my-2 text-sm text-red-500 font-semibold'>
              {errors?.review?.type === 'minLength' && (
                <span>{errors?.review?.message}</span>
              )}
            </p>

            <input
              type='submit'
              className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main mx-1 my-2'
              value='Submit'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceReview;
