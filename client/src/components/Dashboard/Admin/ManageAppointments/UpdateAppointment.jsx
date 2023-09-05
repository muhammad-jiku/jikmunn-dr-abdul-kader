import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  adminAppointmentDetails,
  clearErrors,
} from '../../../../actions/appointmentActions';
import { ADMIN_UPDATE_APPOINTMENT_RESET } from '../../../../constants/appointmentConstant';

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, appointment } = useSelector(
    (state) => state?.appointmentDetails
  );
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state?.appointment);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

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

    if (updateError) {
      // console.log(updateError);
      toast.error('Failed to update appointment!');
      dispatch(clearErrors());
    }
  }, [dispatch, error, updateError]);

  return <>{console.log(appointment)}</>;
};

export default UpdateAppointment;
