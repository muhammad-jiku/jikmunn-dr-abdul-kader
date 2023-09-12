import React, { useEffect, useState } from 'react';
// external imports
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
// internal imports
import {
  adminDeleteAppointment,
  clearErrors,
} from '../../../../actions/appointmentActions';
import { ADMIN_DELETE_APPOINTMENT_RESET } from '../../../../constants/appointmentConstant';

const AppointmentRow = ({ idx, appointment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isDeleted } = useSelector(
    (state) => state?.appointment
  );

  const handleDeleteAppointment = async () => {
    if (appointment?._id) {
      await dispatch(adminDeleteAppointment(appointment?._id));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success('Appointment deleted successfully!!');
      navigate('/dashboard');
      dispatch({
        type: ADMIN_DELETE_APPOINTMENT_RESET,
      });
    }
  }, [dispatch, navigate, isDeleted]);

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
        <button
          className='btn bg-green-600 text-white hover:bg-green-500 rounded-full font-bold mr-2'
          onClick={() =>
            navigate(`/dashboard/admin/appointment/${appointment?._id}`)
          }
        >
          <AiOutlineEdit className='text-md' />
        </button>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeleteAppointment}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default AppointmentRow;
