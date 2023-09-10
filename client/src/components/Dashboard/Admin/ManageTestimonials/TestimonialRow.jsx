import React, { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  adminDeleteTestimonial,
  clearErrors,
} from '../../../../actions/testimonialActions';
import { ADMIN_DELETE_TESTIMONIAL_RESET } from '../../../../constants/testimonialConstant';

const TestimonialRow = ({ testimonial, idx }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isDeleted } = useSelector(
    (state) => state?.testimonial
  );

  const handleDeleteTestimonial = async () => {
    if (testimonial?._id) {
      await dispatch(adminDeleteTestimonial(testimonial?._id));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success('Testimonial deleted successfully!!');
      navigate('/dashboard');
      dispatch({
        type: ADMIN_DELETE_TESTIMONIAL_RESET,
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
      <th>{testimonial?.username}</th>
      <th>{testimonial?.email}</th>
      <th className='flex'>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeleteTestimonial}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default TestimonialRow;
