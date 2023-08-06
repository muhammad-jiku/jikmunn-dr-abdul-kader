import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/authActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state?.user);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <aside className='md:w-1/3 lg:w-1/4 px-4'>
        <ul>
          <li>
            <Link
              to='/dashboard/me'
              className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href='/dashboard/me/appointments'
              className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
            >
              My Appointments
            </Link>
          </li>
          {user?.googleId?.length === 0 && (
            <li>
              <Link
                href='/dashboard/me/update-password'
                className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
              >
                Update Password
              </Link>
            </li>
          )}
          <hr className='my-2 border-2 border-slate-300' />
          {user?.role === 'Admin' && (
            <>
              <li>
                <Link
                  href='/dashboard/admin/new/service'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  New Service
                </Link>
              </li>

              <li>
                <Link
                  href='/dashboard/admin/services'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href='/dashboard/admin/new/price'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  New Price
                </Link>
              </li>

              <li>
                <Link
                  href='/dashboard/admin/prices'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  All Prices
                </Link>
              </li>

              <li>
                <Link
                  href='/dashboard/admin/users'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  All Users
                </Link>
              </li>

              <li>
                <Link
                  href='/dashboard/admin/appointments'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  All Appointments
                </Link>
              </li>

              <li>
                <Link
                  href='/dashboard/admin/reviews'
                  className='block px-3 py-2 text-gray hover:bg-blue-100 hover:text-main rounded-md'
                >
                  All Reviews
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
