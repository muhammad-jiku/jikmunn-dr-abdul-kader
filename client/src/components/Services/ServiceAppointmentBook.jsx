import React, { useEffect, useState } from 'react';
// external imports
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';
// internal import
import { addBookingItems } from '../../actions/bookingActions';

const ServiceAppointmentBook = ({ service, setShowModal }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);

  const [title, setTitle] = useState(service ? service?.title : '');
  const [email, setEmail] = useState(user ? user?.email : '');
  const [slotTimes, setSlotTimes] = useState(
    service?.slots?.length > 0 ? service?.slots : null
  );
  const [slotTime, setSlotTime] = useState(
    service?.slots?.length > 0 ? service?.slots?.[0] : ''
  );
  const [date, setDate] = useState(new Date());
  const [confirmFirstMeeting, setConfirmFirstMeeting] = useState(null);
  // const formattedDate = format(date, 'PP');
  const formattedDate = date?.toDateString();

  const {
    register,
    formState: {
      errors,
      // isSubmitSuccessful
    },
    // reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const appointmentData = {
      title,
      email: user?.email || email,
      fee: confirmFirstMeeting ? 150 : 120,
      date: formattedDate,
      slotTime,
    };

    console.log(confirmFirstMeeting);
    console.log(appointmentData);
    if (confirmFirstMeeting === true || confirmFirstMeeting === false) {
      dispatch(addBookingItems(appointmentData));
      toast.success(`You booked appointment for ${appointmentData?.title}!`);
      navigate('/bookings');
      setShowModal(false);
    }
  };

  useEffect(() => {
    const offDay = ['Slot Unavailable'];

    const satSlots = [
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
      // '04:00 PM - 04:30 PM',
      // '04:30 PM - 05:00 PM',
      // // evening
      // '05:00 PM - 05:30 PM',
      // '05:30 PM - 06:00 PM',
      // '06:00 PM - 06:30 PM',
      // '06:30 PM - 07:00 PM',
      // night
      '07:00 PM - 07:30 PM',
      '07:30 PM - 08:00 PM',
      '08:00 PM - 08:30 PM',
      '08:30 PM - 09:00 PM',
      '09:00 PM - 09:30 PM',
      '09:30 PM - 10:00 PM',
    ];

    if (formattedDate?.split(' ')[0] === 'Fri') {
      setSlotTimes(offDay);
    } else if (formattedDate?.split(' ')[0] === 'Sat') {
      setSlotTimes(satSlots);
    } else {
      setSlotTimes(service?.slots);
    }
  }, [formattedDate, slotTimes, service]);

  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 md:inset-0 h-[calc(100%-1rem)] max-h-full z-50 outline-none focus:outline-none backdrop-blur'>
        <div className='relative w-full max-w-md max-h-full my-6 mx-auto'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
              <h3 className='text-xl font-semibold'>
                {service?.title + "'s"} Booking
              </h3>
              <button
                className='bg-transparent border-0 text-black float-right'
                onClick={() => setShowModal(false)}
              >
                <span className='text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full'>
                  x
                </span>
              </button>
            </div>
            <div className='relative p-0 box-border flex-auto'>
              <div className='flex flex-col items-center'>
                <DayPicker
                  mode='single'
                  selected={date}
                  // onSelect={setDate}
                  onDayClick={(day) => {
                    setDate(day);
                  }}
                />
              </div>
              <form
                className='p-3 md:p-4 w-full'
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Title */}
                <input
                  type='text'
                  placeholder='Title'
                  defaultValue={title}
                  {...register('title', {
                    onChange: (e) => setTitle(e.target.value),
                    required: {
                      value: true,
                      message: 'Please fill up the Title field',
                    },
                    minLength: {
                      value: 3,
                      message: 'Title must be at least three characters',
                    },
                  })}
                  className='input input-bordered bg-white border-main w-full mb-2'
                />

                {/* Email */}
                <input
                  type='email'
                  placeholder='Email'
                  // value={email}
                  defaultValue={user?.email || email}
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

                {/* Formatted Date */}
                <input
                  type='text'
                  placeholder='Date'
                  value={formattedDate}
                  // defaultValue={formattedDate}
                  {...register('date', {
                    //   onChange: (e) => setTitle(e.target.value),
                    //   required: {
                    //     value: true,
                    //     message: 'Please fill up the Title field',
                    //   },
                    //   minLength: {
                    //     value: 3,
                    //     message: 'Title must be at least three characters',
                    //   },
                  })}
                  disabled
                  className='input input-bordered bg-white border-main w-full my-2'
                />

                {/* Slot Time */}
                <select
                  defaultValue={slotTime || service?.slots?.[0]}
                  className='select bg-white border-main w-full my-2'
                  {...register('slotTime', {
                    onChange: (e) => setSlotTime(e.target.value),
                    required: {
                      value: true,
                      message: 'Please select meeting time',
                    },
                  })}
                  disabled={formattedDate?.split(' ')[0] === 'Fri'}
                >
                  {slotTimes?.map((slot, idx) => (
                    <option key={idx} value={slot} placeholder={'Time'}>
                      {slot}
                    </option>
                  ))}
                </select>

                {/* Meeting Status */}
                <p className='my-2 text-sm lg:text-lg'>
                  Is this your first appointment with the doctor?
                </p>
                <div className='my-2 p-2 flex'>
                  <label htmlFor='yes'>
                    <input
                      {...register('confirmFirstMeeting', {
                        // onChange: (e) => setConfirmFirstMeeting(e.target.value),
                        // onChange: (e) => setConfirmFirstMeeting(true),
                      })}
                      type='radio'
                      // defaultValue={confirmFirstMeeting}
                      value={confirmFirstMeeting}
                      id='yes'
                      // onChange={(e) => setConfirmFirstMeeting(e.target.value)}
                      onChange={(e) => setConfirmFirstMeeting(true)}
                    />
                    <span className='ml-2'> Yes</span>
                  </label>
                  <label htmlFor='no'>
                    <input
                      {...register('confirmFirstMeeting', {
                        // onChange: (e) => setConfirmFirstMeeting(e.target.value),
                        // onChange: (e) => setConfirmFirstMeeting(false),
                      })}
                      type='radio'
                      // defaultValue={confirmFirstMeeting}
                      value={confirmFirstMeeting}
                      id='no'
                      // onChange={(e) => setConfirmFirstMeeting(e.target.value)}
                      onChange={(e) => setConfirmFirstMeeting(false)}
                      className='ml-6'
                    />
                    <span className='ml-2'> No</span>
                  </label>
                </div>

                {/* Error messages */}
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
                  {errors?.slotTime?.type === 'required' && (
                    <span>{errors?.slotTime?.message}</span>
                  )}
                </p>
                <p className='my-2 text-sm text-red-500 font-semibold'>
                  {confirmFirstMeeting === null && (
                    <span>Please confirm meeting status</span>
                  )}
                </p>
                <div className='form-control mt-2'>
                  <input
                    type='submit'
                    className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
                    value='Book now'
                    disabled={formattedDate?.split(' ')[0] === 'Fri'}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceAppointmentBook;
