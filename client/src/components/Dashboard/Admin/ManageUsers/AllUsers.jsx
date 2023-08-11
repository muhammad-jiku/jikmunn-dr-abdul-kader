import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { adminAllUsers, clearErrors } from '../../../../actions/authActions';
import UserRow from './UserRow';

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state?.allUsers);

  useEffect(() => {
    dispatch(adminAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className='container mx-auto my-4 p-2 flex flex-col items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider mt-2 mb-4'>
        All Users
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='overflow-x-auto my-2 w-full'>
        <table className='table table-xs sm:table-sm md:table-md lg:table-lg p-1 md:p-2 w-full'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <UserRow user={user} idx={idx} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
