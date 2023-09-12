import React, { useEffect, useState } from 'react';
// external imports
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// internal imports
import { clearErrors } from '../../../actions/appointmentActions';
import { MdOutlinePayment, MdOutlineVideocam } from 'react-icons/md';

const AppointmentRow = ({ idx, appointment, error }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (appointment?.bookingStatus === 'Processing') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [appointment?.bookingStatus]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <tr>
      <th>{idx + 1 >= 10 ? idx + 1 : '0' + (idx + 1)}</th>
      <th>{appointment?.bookingStatus}</th>
      <th>${appointment?.totalFees}</th>
      <th className='flex'>
        {(!appointment?.paymentInfo?.id ||
          appointment?.paymentInfo?.id?.length === 0) && (
          <button
            className='m-2 lg:m-1 my-4 lg:my-[-4px] p-2 flex justify-center items-center text-xs text-white bg-main hover:text-main hover:bg-white border-[1px] hover:border-main rounded w-auto uppercase'
            onClick={() => navigate(`/payment`)}
          >
            <MdOutlinePayment className='text-lg mr-1' /> Pay
          </button>
        )}
        {/* {appointment?.bookingStatus === 'Succeeded' && ( */}
        <button
          className='btn m-2 lg:m-1 my-4 lg:my-[-4px] p-2 text-xs text-white bg-main hover:text-main hover:bg-white border-[1px] hover:border-main rounded w-auto uppercase'
          disabled={isDisabled}
        >
          <a
            className='flex justify-center items-center'
            href='https://meet.google.com/sxf-jsuv-hjn'
            rel='noreferrer'
            target='_blank'
          >
            <MdOutlineVideocam className='text-lg mr-1' /> Join
          </a>
        </button>
        {/* )} */}
      </th>
    </tr>
  );
};

export default AppointmentRow;
