import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <section className='py-5 sm:py-7 bg-blue-100'>
        <div className='container max-w-screen-xl mx-auto px-4'>
          <h1 className='text-bold text-2xl'>My Dashboard</h1>
        </div>
      </section>

      <section className='py-10'>
        <div className='container max-w-screen-xl mx-auto px-4'>
          <div className='flex flex-col md:flex-row -mx-4'>
            <Sidebar />
            <main className='md:w-2/3 lg:w-3/4 px-4'>
              <article className='border border-gray bg-white shadow-sm rounded mb-5 p-3 lg:p-5'>
                <Outlet />
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
