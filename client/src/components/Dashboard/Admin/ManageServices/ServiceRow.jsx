import React, { useEffect } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  adminDeleteServiceDetails,
  clearErrors,
} from '../../../../actions/serviceActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADMIN_DELETE_SERVICE_DETAILS_RESET } from '../../../../constants/serviceConstant';

const ServiceRow = ({ service }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isDeleted } = useSelector((state) => state?.service);

  const handleDeleteService = async () => {
    if (service?._id) {
      await dispatch(adminDeleteServiceDetails(service?._id));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success('Service detail deleted successfully!!');
      navigate('/dashboard');
      dispatch({
        type: ADMIN_DELETE_SERVICE_DETAILS_RESET,
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
      <th>{service?.serviceID}</th>
      <th>{service?.title}</th>
      <th>{String(service?.createdAt).substr(0, 10)}</th>
      <th className='flex'>
        <button
          className='btn bg-green-600 text-white hover:bg-green-500 rounded-full font-bold mr-2'
          onClick={() => navigate(`/dashboard/admin/service/${service?._id}`)}
        >
          <AiOutlineEdit className='text-md' />
        </button>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeleteService}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default ServiceRow;
