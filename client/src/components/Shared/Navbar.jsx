import React, { useState } from 'react';
import { IoLocation, IoCall } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logoImg from '../../assets/images/logo.png';
import profileImg from '../../assets/images/default_profile_avatar.png';
import { toast } from 'react-toastify';
import { signOutUser } from '../../actions/authActions';
import { FiMenu } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

const Navbar = ({ isAuthenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutUser());
    toast.success('Sign Out Successfully!! 👍');
    navigate('/');
  };

  const menuItems = (
    <>
      <li>
        <Link
          to={'/about'}
          className='my-4 lg:my-0 text-white lg:text-black hover:text-gray'
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to={'/services'}
          className='my-4 lg:my-0 text-white lg:text-black hover:text-gray'
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          to={'/prices'}
          className='my-4 lg:my-0 text-white lg:text-black hover:text-gray'
        >
          Prices
        </Link>
      </li>
      {/* <li>
        <Link
          to={'/blogs'}
          className='my-4 lg:my-0 text-white lg:text-black hover:text-gray'
        >
          Blogs
        </Link>
      </li> */}
      <li>
        <Link
          to={'/contacts'}
          className='my-4 lg:my-0 text-white lg:text-black hover:text-gray'
        >
          Contacts
        </Link>
      </li>
      {isAuthenticated && user ? (
        <button
          className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main my-4 lg:my-0 mr-2 w-full lg:w-auto flex uppercase'
          onClick={signOutHandler}
        >
          sign out
        </button>
      ) : (
        <li>
          <Link
            to={'/signin'}
            className='my-4 lg:my-0 text-white lg:text-black hover:text-gray'
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
        <div className='ml-2 hidden md:flex md:flex-col cursor-pointer'>
          <h1 className='text-xl font-lobster leading-none'>Dr. Abdul Kader</h1>
          <h1 className='text-sm font-oswald leading-none text-gray'>
            family doctor near you
          </h1>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a className='hover:bg-white hover:text-main'>
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
              <div className='hidden md:block space-y-1 font-medium'>
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
