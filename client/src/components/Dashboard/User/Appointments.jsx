import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  allAppointments,
  clearErrors,
} from '../../../actions/appointmentActions';
import AppointmentRow from './AppointmentRow';

const Appointments = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, appointments } = useSelector(
    (state) => state?.appointments
  );

  useEffect(() => {
    dispatch(allAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {appointments?.length > 0 ? (
        <div className='container mx-auto my-4 p-2 flex flex-col items-center'>
          <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-2 mb-4'>
            My Appointments
          </h2>
          <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
          <div className='overflow-x-auto my-2 w-full'>
            <table className='table table-xs sm:table-sm md:table-md lg:table-lg p-1 md:p-2 w-full'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.map((appointment, idx) => (
                  <AppointmentRow
                    key={idx}
                    idx={idx}
                    appointment={appointment}
                    error={error}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='p-2 min-h-[500px] flex flex-col justify-center items-center'>
          <h2 className='text-lg sm:text-xl lg:text-3xl text-error font-lobster'>
            You did not book any appointment yet!
          </h2>
        </div>
      )}
    </>
  );
};

export default Appointments;
