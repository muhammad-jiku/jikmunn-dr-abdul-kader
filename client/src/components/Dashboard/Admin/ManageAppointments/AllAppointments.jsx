import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminAllappointments,
  clearErrors,
} from '../../../../actions/appointmentActions';
import { toast } from 'react-toastify';

const AllAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, appointments } = useSelector(
    (state) => state?.allAppointments
  );

  useEffect(() => {
    dispatch(adminAllappointments());
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
              <tbody>{console.log(appointments)}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='p-2 min-h-[500px] flex flex-col justify-center items-center'>
          <h2 className='text-lg sm:text-xl lg:text-3xl text-error font-lobster'>
            No appointment booked yet!
          </h2>
        </div>
      )}
    </>
  );
};

export default AllAppointments;
