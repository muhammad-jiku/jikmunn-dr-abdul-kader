import React from 'react';
// internal imports
import { SocialIcons } from '..';
import myImg from '../../assets/images/me.png';

const AboutDetails = () => {
  return (
    <>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
        My Story
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        explore my timeline
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='flex flex-col w-full items-center container mx-auto my-10'>
        <div className='grid flex-grow card place-items-center'>
          <div className='avatar mx-2'>
            <div className='w-52 rounded-full ring ring-main ring-offset-base-100 ring-offset-2'>
              <img src={myImg} alt='avatar' />
            </div>
          </div>{' '}
          <div className='p-6'>
            <SocialIcons />
          </div>
        </div>
        <div className='divider'></div>
        <div className='grid flex-grow card place-items-start p-0 md:p-2'>
          <p className='p-6 text-justify text-sm lg:text-lg'>
            Hello there, I am <span className='text-main'>Dr. Abdul Kader</span>
            . Welcome here. I completed my M.B.B.S from Cumilla Medical College
            and obtain the degree of Bachelor of Medicine and Bachelor of
            Surgery from the University of Chattogram. After that, I completed
            my scheduled one-year internship training direct supervision of the
            professor in charge of the Dept. of Medicine, Surgery and
            Obstetrics, Gynecology.
          </p>

          <p className='p-6 text-justify text-sm lg:text-lg'>
            I received the certificate of full registration as a medical
            practitioner. And I have then, completed a three-month course of
            Certificate in Medical Ultrasound (C.M.U). I have completed the
            six-month certificate course on the Diabetology under Distance
            Learning Programme (DLP). I Passed the 39th BCS (Health) & attended
            Orientation training developed by DGHS and joined as an Assitant
            Surgeon. In my spare time, I watch Football matches, and Movies.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutDetails;
