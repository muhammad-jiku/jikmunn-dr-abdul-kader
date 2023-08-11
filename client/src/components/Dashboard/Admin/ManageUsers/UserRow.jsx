import React, { useEffect } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { adminDeleteUser, clearErrors } from '../../../../actions/authActions';
import { ADMIN_DELETE_USER_RESET } from '../../../../constants/authConstant';

const UserRow = ({ user, idx }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isDeleted } = useSelector((state) => state?.profile);

  const handleDeleteUser = async () => {
    if (user?._id) {
      await dispatch(adminDeleteUser(user?._id));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success('User deleted successfully!!');
      navigate('/dashboard');
      dispatch({
        type: ADMIN_DELETE_USER_RESET,
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
      <th>{idx + 1}</th>
      <th>{user?.email}</th>
      <th>{user?.role}</th>
      <th className='flex'>
        <button
          className='btn bg-green-600 text-white hover:bg-green-500 rounded-full font-bold mr-2'
          onClick={() => navigate(`/dashboard/admin/user/${user?._id}`)}
        >
          <AiOutlineEdit className='text-md' />
        </button>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeleteUser}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default UserRow;
