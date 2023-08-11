import React from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user, idx }) => {
  const navigate = useNavigate();

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
        <button className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'>
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default UserRow;
