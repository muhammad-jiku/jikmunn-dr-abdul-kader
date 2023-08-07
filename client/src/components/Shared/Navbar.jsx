import React, { useState } from 'react';
import { IoLocation, IoCall } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logoImg from '../../assets/images/logo.png';
import profileImg from '../../assets/images/default_profile_avatar.png';
import { toast } from 'react-toastify';
import { signOutUser } from '../../actions/authActions';

const Navbar = ({ isAuthenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);

  const signOutHandler = () => {
    dispatch(signOutUser());
    toast.success('Sign Out Successfully!! 👍');
    navigate('/');
  };

  const menuItems = (
    <>
      <li>
        <Link to={'/about'} className='hover:bg-white hover:text-main'>
          About
        </Link>
      </li>
      <li>
        <Link to={'/services'} className='hover:bg-white hover:text-main'>
          Services
        </Link>
      </li>
      <li>
        <Link to={'/prices'} className='hover:bg-white hover:text-main'>
          Prices
        </Link>
      </li>
      {/* <li>
        <Link to={'/blogs'} className='hover:bg-white hover:text-main'>
          Blogs
        </Link>
      </li> */}
      <li>
        <Link to={'/contacts'} className='hover:bg-white hover:text-main'>
          Contacts
        </Link>
      </li>
      {isAuthenticated && user ? (
        <button
          className='btn bg-main text-white hover:bg-white hover:text-black hover:border-main mr-2 flex uppercase'
          onClick={signOutHandler}
        >
          sign out
        </button>
      ) : (
        <li>
          <Link to={'/signin'} className='hover:bg-white hover:text-main'>
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
            <div className='flex items-center my-4 space-x-3 cursor-pointer'>
              <img
                className='w-10 h-10 rounded-full'
                src={
                  user.avatar?.url?.length > 0 ? user?.avatar?.url : profileImg
                }
                // src={profileImg}
                loading='lazy'
                alt={user ? user?.username : 'user'}
              />
              <div className='hidden sm:block space-y-1 font-medium'>
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

        <div className='dropdown dropdown-bottom dropdown-end lg:hidden'>
          <label tabIndex={-1}>
            {/* <Hamburger
                  hideOutline={false}
                  size={20}
                  distance='sm'
                  // color='#4FD1C5'
                  onToggle={(toggled) => {
                    if (toggled) {
                      setIsOpen(true);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  tabIndex={-1}
                /> */}
          </label>

          {isOpen && (
            <ul
              tabIndex={-1}
              className='menu menu-md dropdown-content mt-3 ml-4 p-3 box-border shadow bg-main rounded-box w-screen h-screen z-50'
            >
              {menuItems}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
