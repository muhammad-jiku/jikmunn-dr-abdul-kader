import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className='min-h-screen container mx-auto my-2 p-10 drop-shadow-2xl'>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-1/2 container mx-auto'>
          <ul
            className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'
            role='tablist'
          >
            <li
              className={
                '-mb-px mr-2 last:mr-0 flex-auto cursor-pointer text-center ' +
                (openTab === 1 &&
                  'border-2 border-t-white border-x-white border-b-main')
              }
            >
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1 ? 'text-main' : 'text-black')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle='tab'
                // href='#link1'
                role='tablist'
              >
                Sign in
              </a>
            </li>
            <li
              className={
                '-mb-px mr-2 last:mr-0 flex-auto cursor-pointer text-center ' +
                (openTab === 2 &&
                  'border-2 border-t-white border-x-white border-b-main')
              }
            >
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2 ? 'text-main' : 'text-black')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle='tab'
                // href='#link2'
                role='tablist'
              >
                Sign up
              </a>
            </li>
          </ul>

          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
            <div className='flex-auto'>
              <div className='tab-content tab-space'>
                <div
                  className={openTab === 1 ? 'block' : 'hidden'}
                  // id='link1'
                >
                  <SignIn />
                </div>
                <div
                  className={openTab === 2 ? 'block' : 'hidden'}
                  // id='link2'
                >
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
