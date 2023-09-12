import React, { useEffect } from 'react';
// external imports
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// internal imports
import { adminDeleteUser, clearErrors } from '../../../../actions/authActions';
import { ADMIN_DELETE_USER_RESET } from '../../../../constants/authConstant';
import profileImg from '../../../../assets/images/default_profile_avatar.png';

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
      <th>{idx + 1 >= 10 ? idx + 1 : '0' + (idx + 1)}</th>
      <th>
        <img
          className='w-10 h-10 rounded-full'
          src={user.avatar?.url?.length > 0 ? user?.avatar?.url : profileImg}
          alt={user ? user?.username : 'user'}
          loading='lazy'
        />
      </th>
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
