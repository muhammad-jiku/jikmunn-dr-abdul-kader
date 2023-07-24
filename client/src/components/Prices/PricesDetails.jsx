import React from 'react';
import firstAppointmentImg from '../../assets/images/first-appointment.jpg';
import followUpAppointmentImg from '../../assets/images/follow-up-appointment.jpg';
import weAcceptImg from '../../assets/images/we-accept.jpg';
import { CustomPriceCard } from '..';

const PricesDetails = () => {
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
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
      {prices.map((price, index) => (
        <CustomPriceCard key={index} price={price} />
      ))}
    </div>
  );
};

export default PricesDetails;
