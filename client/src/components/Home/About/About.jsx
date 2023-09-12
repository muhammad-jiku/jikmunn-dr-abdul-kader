import React from 'react';
// external imports
import CountUp from 'react-countup';
import { GiStethoscope } from 'react-icons/gi';
// internal import
import activeFamilyImg from '../../../assets/images/activeFamilyMirror.jpg';

const About = () => {
  return (
    <div
      className={`hero min-h-[400px] bg-cover bg-no-repeat w-full flex flex-col opacity-70`}
      //   className={`hero min-h-screen`}
      style={{ backgroundImage: `url(${activeFamilyImg})` }}
    >
      <div className='z-40 container m-auto flex flex-col lg:flex-row justify-center items-center box-border'>
        <div className='m-4 p-4 flex justify-center items-center z-50 box-border'>
          <GiStethoscope className='text-white text-5xl lg:text-7xl mr-2' />
          <h2 className='text-2xl lg:text-5xl text-white font-lobster tracking-wide lg:tracking-widest'>
            Learn more about me
          </h2>
        </div>
        <div className='w-full lg:w-1/2 px-2 lg:p-0 mx-auto lg:mx-2 mt-0 lg:mt-[-220px] z-50 relative'>
          <div className='p-10 bg-white drop-shadow-2xl box-border absolute'>
            <div className='flex flex-col'>
              <h2 className='text-3xl lg:text-5xl text-main font-extrabold font-lobster tracking-wide lg:tracking-widest my-2'>
                People Trust Me
              </h2>
              <h2 className='text-lg lg:text-xl font-semibold text-gray mb-2 font-oswald tracking-widest'>
                because my patients are my family
              </h2>
              <hr className='w-1/2 mb-2 border-[1px] border-slate-300' />
              <div className='py-2 box-border'>
                <p className='text-gray text-justify my-2 text-sm md:text-lg'>
                  One of the most critical factors in people’s lives is the
                  information about, using, and growing knowledge of medicine.
                  Medicine is a form of art. It depends on how skillfully
                  doctors apply their knowledge when dealing with patients.
                </p>
              </div>
              <div className='py-3 flex justify-around'>
                <div className='mx-2'>
                  <h3 className='text-xl lg:text-4xl font-bold text-three'>
                    <CountUp end={1000} duration={5} />+
                  </h3>
                  <h3 className='text-sm font-bold'>Satisfied Patients</h3>
                </div>
                <div className='mx-2'>
                  <h3 className='text-xl lg:text-4xl font-bold text-three'>
                    <CountUp end={300} duration={5} />+
                  </h3>
                  <h3 className='text-sm font-bold'>Families Trust</h3>
                </div>
                <div className='mx-2'>
                  <h3 className='text-xl lg:text-4xl font-bold text-three'>
                    24/7
                  </h3>
                  <h3 className='text-sm font-bold'>Emergency Help</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
