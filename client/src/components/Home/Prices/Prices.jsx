import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import firstAppointmentImg from '../../../assets/images/first-appointment.jpg';
import followUpAppointmentImg from '../../../assets/images/follow-up-appointment.jpg';
import weAcceptImg from '../../../assets/images/we-accept.jpg';
import { CustomPriceCard } from '../../';

const Prices = () => {
  const prices = [
    {
      name: 'First Appointment',
      description: [
        'Medical History',
        'Physical Exam',
        'Diagnosis & Prescription',
      ],
      price: '150',
      image: `${firstAppointmentImg}`,
    },
    {
      name: 'Follow-up Appointment',
      description: [
        'Medical History',
        'Physical Exam',
        'Diagnosis & Prescription',
      ],
      price: '120',
      image: `${followUpAppointmentImg}`,
    },
    {
      name: 'We Accept',
      description: [
        'Medical History',
        'Physical Exam',
        'Diagnosis & Prescription',
      ],
      price: 'Insurance',
      image: `${weAcceptImg}`,
    },
  ];

  return (
    <div className='container mx-auto my-10 p-3 min-h-screen flex flex-col justify-center items-center'>
      <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
        Prices & Insurance
      </h2>
      <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
        fair prices for better quality
      </h2>
      <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
        {prices.map((price, index) => (
          <CustomPriceCard key={index} price={price} />
        ))}
      </div>
      <Link to={'/prices'}>
        <h2 className='text-lg lg:text-xl text-gray font-bold my-2 flex justify-center items-center'>
          <span>View All Prices</span>
          <BsArrowRight className='ml-2 font-bold' />
        </h2>
      </Link>
    </div>
  );
};

export default Prices;
