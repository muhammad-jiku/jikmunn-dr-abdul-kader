import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import bgImg from '../../assets/images/bg3.jpg';
import aboutmeImg from '../../assets/images/about-me-icon.png';
import workTimeImg from '../../assets/images/work-time-icon.png';
import contactImg from '../../assets/images/contact-icon.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const data = [
    {
      name: 'About Me',
      description: [
        'Dr. Abdul Kader is a B.M.D.C registered Family Medicine physician who provides primary care',
      ],
      image: `${aboutmeImg}`,
    },
    {
      name: 'Working Hours',
      description: [
        'Sun - Thu: 8.00 am - 6.00 pm',
        'Saturday: 10.00 am - 3.00 pm',
        'Friday: Closed',
      ],
      image: `${workTimeImg}`,
    },
    {
      name: 'Contacts',
      description: [
        'Phone: +880 183 227 8260',
        '310 Razzak Complex, SSK Road, Feni',
      ],
      image: `${contactImg}`,
      link: 'contacts',
    },
  ];

  return (
    <div
      className={`hero min-h-[600px] lg:min-h-screen bg-cover bg-no-repeat bg-opacity-80 w-full flex flex-col opacity-75`}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className='container mx-auto my-10 p-10 box-border flex flex-col items-center'>
        <h2 className='text-lg lg:text-xl font-semibold font-oswald tracking-widest my-2'>
          Subscribe to My Newsletter
        </h2>
        <div className='join my-6'>
          <input
            className='input input-bordered bg-white border-main join-item'
            placeholder='Email'
          />
          <button className='btn join-item bg-main text-white border-main hover:bg-white hover:text-main hover:border-main'>
            Subscribe
          </button>
        </div>
        <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
          {data.map((footerInfo, index) => (
            <div className='m-4 p-10 bg-white drop-shadow-2xl' key={index}>
              <div className='flex flex-col items-center'>
                <img
                  src={footerInfo?.image}
                  alt={footerInfo?.name}
                  className='rounded-xl h-24 w-24'
                />
                <h2 className='text-xl md:text-2xl text-center my-2'>
                  {footerInfo?.name}
                </h2>{' '}
                <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
                <div className='py-2 box-border'>
                  {footerInfo?.description?.map((info, i) => (
                    <p
                      className='text-gray text-justify my-2 text-sm md:text-lg'
                      key={i}
                    >
                      <span>{info}</span>
                    </p>
                  ))}
                </div>{' '}
                {footerInfo?.link && (
                  <p
                    className='text-gray text-justify my-2 text-sm md:text-lg cursor-pointer flex justify-center items-center'
                    onClick={() => {
                      navigate(`/${footerInfo?.link}`);
                    }}
                  >
                    <span>Get Directions</span>{' '}
                    <BsArrowRight className='ml-1 font-bold' />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className='text-sm lg:text-lg font-semibold font-oswald tracking-widest my-2'>
          Copyright © {year} by{' '}
          <span className='text-xl font-lobster'>jikmunn</span>. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
