import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  adminAppointmentDetails,
  adminUpdateAppointment,
  clearErrors,
} from '../../../../actions/appointmentActions';
import { ADMIN_UPDATE_APPOINTMENT_RESET } from '../../../../constants/appointmentConstant';

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state?.user
  );
  const {
    loading: appointmentLoading,
    error: appointmentError,
    appointment,
  } = useSelector((state) => state?.appointmentDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state?.appointment);

  const appointmentStatus = ['Processing', 'Succeeded'];

  const [bookingStatus, setBookingStatus] = useState(
    appointment ? `${appointment?.bookingStatus}` : ''
  );

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();

    const appointmentInfo = {
      bookingStatus,
    };

    console.log(id, appointmentInfo);
    if (bookingStatus?.length > 0) {
      dispatch(adminUpdateAppointment(id, appointmentInfo));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(adminAppointmentDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isSubmitSuccessful && isUpdated) {
      reset();
      toast.success('Appointment Updated Successfully!');
      navigate('/dashboard/admin/appointments');
      dispatch({
        type: ADMIN_UPDATE_APPOINTMENT_RESET,
      });
    }
  }, [dispatch, reset, navigate, isSubmitSuccessful, isUpdated]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (appointmentError) {
      // console.log(appointmentError);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (updateError) {
      // console.log(updateError);
      toast.error('Failed to update appointment!');
      dispatch(clearErrors());
    }
  }, [dispatch, error, appointmentError, updateError]);

  return (
    <>
      {console.log(appointment)}
      <div className='p-0 sm:p-2 box-border'>
        {/* Appointment Info */}
        <div className='my-2 py-2 box-border flex items-center justify-between sm:justify-start'>
          <h2 className='mr-2 px-4 py-2 text-xs sm:text-sm md:text-lg bg-[#f2f2f2] rounded-3xl'>
            Appointment{' '}
            <span className='text-main'>
              #{appointment && appointment?._id?.slice(0, 5)}
            </span>
          </h2>
          <h2 className='text-xs md:text-md text-gray'>
            Appointment Booked: {String(appointment?.createdAt).substr(0, 10)}
          </h2>
        </div>
        <hr className='w-2/3 lg:w-3/4 mb-2 border-2 border-slate-300' />

        {/* Patient Info */}
        <div className='my-2 py-2 box-border'>
          <div className='mb-2'>
            <h2 className='text-xl md:text-3xl text-main font-bold font-lobster'>
              Patient Info
            </h2>
          </div>
          <div className='my-4'>
            <input
              type='text'
              className='my-2 p-2 w-full border-b-[1px] border-main text-black bg-white'
              readOnly
              defaultValue={user && user?.username}
            />
            <input
              type='email'
              className='my-2 p-2 w-full border-b-[1px] border-main text-black bg-white'
              readOnly
              defaultValue={user && user?.email}
            />
            <input
              type='text'
              className='my-2 p-2 w-full border-b-[1px] border-main text-black bg-white'
              readOnly
              defaultValue={appointment && `$${appointment?.totalFees}`}
            />
          </div>
          <div className='mt-1 py-2'>
            <button
              className={`mr-2 px-4 py-1 text-lg bg-[#f2f2f2] font-bold rounded-3xl ${
                appointment?.paymentInfo &&
                appointment?.paymentInfo?.status === 'succeeded'
                  ? 'text-green-600'
                  : 'text-error'
              }`}
            >
              {appointment?.paymentInfo &&
              appointment?.paymentInfo?.status === 'succeeded'
                ? 'Paid'
                : 'Not Paid'}
            </button>
            <button
              className={`mr-2 px-4 py-1 text-lg bg-[#f2f2f2] font-bold rounded-3xl ${
                appointment?.bookingStatus &&
                appointment?.bookingStatus === 'Succeeded'
                  ? 'text-green-600'
                  : 'text-error'
              }`}
            >
              {appointment && appointment?.bookingStatus}
            </button>
          </div>
        </div>
        <hr className='w-2/3 lg:w-3/4 mb-2 border-2 border-slate-300' />

        {/* Booking Items */}
        <div className='my-2 p-2 box-border'>
          {appointment?.bookingItems?.length > 0 &&
            appointment?.bookingItems.map((item) => (
              <div
                key={item?.service}
                className='flex items-center justify-start'
              >
                <div className='my-1 flex items-center justify-center'>
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className='mr-2 my-2 h-16 md:h-24'
                  />
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <Link
                    to={`/services/${item?.title}`}
                    className='mt-2 mb-1 text-main text-sm md:text-lg no-underline'
                  >
                    {item?.title}
                  </Link>
                  <h2 className='text-xs md:text-sm mb-1 text-gray no-underline'>
                    Fee: ${item?.fee}
                  </h2>
                  <h2 className='text-xs md:text-sm mb-1 text-gray no-underline'>
                    Date: {item?.date}
                  </h2>
                  <h2 className='text-xs md:text-sm mb-1 text-gray no-underline'>
                    Time: {item?.meetingTime}
                  </h2>
                </div>
              </div>
            ))}
        </div>
        <hr className='w-2/3 lg:w-3/4 mb-2 border-2 border-slate-300' />

        {/* Booking Status */}
        <div className='my-2 p-2 box-border'>
          <div className='mb-2'>
            <h2 className='text-xl md:text-3xl text-main font-bold font-lobster'>
              Booking Status
            </h2>
          </div>

          <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
            <select
              defaultValue={appointment?.bookingStatus || bookingStatus}
              className='select bg-white border-main w-full my-2'
              {...register('bookingStatus', {
                onChange: (e) => setBookingStatus(e.target.value),
                required: {
                  value: true,
                  message: 'Please select booking status',
                },
                minLength: {
                  value: 4,
                  message: 'Invalid booking status selection',
                },
              })}
            >
              {appointmentStatus.map((a, idx) => (
                <option
                  key={idx}
                  value={a}
                  // label={'Country'}
                  placeholder={'Booking Status'}
                >
                  {a}
                </option>
              ))}
            </select>
            <p className='my-2 text-sm text-red-500 font-semibold'>
              {errors?.bookingStatus?.type === 'required' && (
                <span>{errors?.bookingStatus?.message}</span>
              )}
            </p>
            <p className='my-2 text-sm text-red-500 font-semibold'>
              {errors?.bookingStatus?.type === 'minLength' && (
                <span>{errors?.bookingStatus?.message}</span>
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
      </div>
    </>
  );
};

export default UpdateAppointment;
