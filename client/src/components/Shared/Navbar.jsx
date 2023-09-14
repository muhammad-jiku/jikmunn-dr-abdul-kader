import React, { useState } from 'react';
// external imports
import { IoLocation, IoCall } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiMenu } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
// internal imports
import logoImg from '../../assets/images/logo.png';
import { signOutUser } from '../../actions/authActions';
import profileImg from '../../assets/images/default_profile_avatar.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state?.user);

  const bookingItems = JSON.parse(localStorage.getItem('bookingItems'));

  const signOutHandler = () => {
    dispatch(signOutUser());
    toast.success('Sign Out Successfully!! 👍');
    navigate('/');
    setIsOpen(false);
  };

  const menuItems = (
    <>
      <li>
        <Link
          to={'/about'}
          className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to={'/services'}
          className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          to={'/prices'}
          className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Prices
        </Link>
      </li>
      {/* <li>
        <Link
          to={'/blogs'}
          className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Blogs
        </Link>
      </li> */}
      <li>
        <Link
          to={'/contacts'}
          className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Contacts
        </Link>
      </li>
      {bookingItems && (
        <li>
          <Link
            to={'/bookings'}
            className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            My {bookingItems?.length > 1 ? 'Bookings' : 'Booking'} (
            {bookingItems?.length})
          </Link>
        </li>
      )}
      {isAuthenticated && user ? (
        <li>
          <button
            className='m-2 lg:m-1 my-4 lg:my-[-4px] p-2 text-main lg:text-white bg-white lg:bg-main hover:text-main hover:bg-white border-[1px] hover:border-main rounded w-full lg:w-auto uppercase'
            onClick={signOutHandler}
          >
            Sign out
          </button>
        </li>
      ) : (
        <li>
          <Link
            to={'/signin'}
            className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Sign in
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className='navbar bg-white text-black'>
      <div className='navbar-start'>
        <Link to={'/'}>
          <img src={logoImg} alt='logo' width={50} height={50} />
        </Link>
        <div className='ml-2 hidden lg:flex lg:flex-col cursor-pointer'>
          <h1 className='text-lg font-lobster leading-none'>Dr. Abdul Kader</h1>
          <h1 className='text-sm font-oswald leading-none text-gray'>
            family doctor near you
          </h1>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a className='m-2 lg:m-1 my-4 lg:my-0 p-2 lg:p-1 text-white lg:text-black lg:hover:text-main lg:hover:bg-[#FFFFFF]'>
              <IoLocation className='mr-1' />
              <span className='text-sm'>
                310 Razzak Complex, SSK Road, Feni
              </span>
            </a>
          </li>
          {menuItems}
        </ul>
      </div>
      <div className='navbar-end'>
        {isAuthenticated && user ? (
          <Link to='/dashboard'>
            <div className='flex items-center my-4 space-x-3 absolute right-[70px] lg:right-4 top-1 cursor-pointer'>
              <img
                className='w-10 h-10 rounded-full'
                src={
                  user.avatar?.url?.length > 0 ? user?.avatar?.url : profileImg
                }
                // src={profileImg}
                loading='lazy'
                alt={user ? user?.username : 'user'}
              />
              <div className='hidden lg:block space-y-1 font-medium'>
                <p className='text-xs'>
                  {user?.username}
                  <time className='block text-xs text-gray'>{user?.email}</time>
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <button className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main mr-2 hidden lg:flex'>
            <IoCall /> <span>+880 183 227 8260</span>
          </button>
        )}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className='text-3xl absolute right-8 top-6 cursor-pointer lg:hidden'
        >
          {isOpen ? <GrClose /> : <FiMenu />}
        </div>

        {isOpen ? (
          <ul
            className={`absolute bg-main z-50 left-0 w-full h-full min-h-screen p-8 transition-all duration-500 ease-in ${
              isOpen ? 'top-20 ' : 'top-[-490px]'
            } lg:hidden`}
          >
            {menuItems}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
