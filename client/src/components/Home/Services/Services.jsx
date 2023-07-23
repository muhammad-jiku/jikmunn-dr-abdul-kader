import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import diabeteseImg from '../../../assets/images/diabetes.jpg';
import asthmaImg from '../../../assets/images/asthma2.jpg';
import strokeImg from '../../../assets/images/stroke2.jpg';
import { Link } from 'react-router-dom';
import CustomServiceCard from '../../shared/CustomServiceCard';

const Services = () => {
  const services = [
    {
      id: '01',
      name: 'Diabetes Treatment',
      description:
        'We consider all the signs and symptoms of a patient to diagnose diabetes.',
      image: `${diabeteseImg}`,
    },
    {
      id: '02',
      name: 'Asthma Diagnose',
      description:
        'We guarantee our patients the most effective treatment for asthma at the clinic.',
      image: `${asthmaImg}`,
    },
    {
      id: '03',
      name: 'Stroke Therapeutic',
      description:
        'We examine the neccessary brain parts of our patients here at our facility to provide best treatment for stroke.',
      image: `${strokeImg}`,
    },
  ];

  return (
    <div className='container mx-auto my-10 min-h-screen mb-4 mt-96 sm:mt-72 lg:mt-48 p-3 flex flex-col justify-center items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
        Services
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        ambulant clinic & emergency
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
        {services.map((service, index) => (
          <CustomServiceCard key={index} service={service} />
        ))}
      </div>
      <Link to={'/services'}>
        <h2 className='text-lg lg:text-xl text-gray font-bold my-2 flex justify-center items-center'>
          <span>View All Services</span>
          <BsArrowRight className='ml-2 font-bold' />
        </h2>
      </Link>
    </div>
  );
};

export default Services;
