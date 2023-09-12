import React, { useEffect } from 'react';
// external imports
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// internal imports
import {
  adminDeletePriceDetails,
  clearErrors,
} from '../../../../actions/priceActions';
import { ADMIN_DELETE_PRICE_DETAILS_RESET } from '../../../../constants/priceConstant';

const PriceRow = ({ price }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isDeleted } = useSelector((state) => state?.price);

  const handleDeletePrice = async () => {
    if (price?._id) {
      await dispatch(adminDeletePriceDetails(price?._id));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success('Price detail deleted successfully!!');
      navigate('/dashboard');
      dispatch({
        type: ADMIN_DELETE_PRICE_DETAILS_RESET,
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
      <th>{price?.priceID}</th>
      <th>{price?.title}</th>
      <th>${price?.price}</th>
      <th>{String(price?.createdAt).substr(0, 10)}</th>
      <th className='flex'>
        <button
          className='btn bg-green-600 text-white hover:bg-green-500 rounded-full font-bold mr-2'
          onClick={() => navigate(`/dashboard/admin/price/${price?._id}`)}
        >
          <AiOutlineEdit className='text-md' />
        </button>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeletePrice}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default PriceRow;
