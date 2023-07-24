import React from 'react';
import diabeteseImg from '../../assets/images/diabetes.jpg';
import asthmaImg from '../../assets/images/asthma2.jpg';
import strokeImg from '../../assets/images/stroke2.jpg';
import skinImg from '../../assets/images/skin.jpg';
import newbornImg from '../../assets/images/newborn.jpg';
import emergencyImg from '../../assets/images/emergency247.jpg';
import { CustomServiceCard } from '..';

const ServicesDetails = () => {
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
    {
      id: '04',
      name: 'Skin Care',
      description:
        'For patients’ convenience, we take every step to guarantee our patients the most effective care for skin.',
      image: `${skinImg}`,
    },
    {
      id: '05',
      name: 'New Born Care',
      description:
        'Management and care of a patient to combat disease or disorder.',
      image: `${newbornImg}`,
    },
    {
      id: '06',
      name: 'Emergency Services',
      description:
        'We have special equipment to provide emergency help when it is necessary.',
      image: `${emergencyImg}`,
    },
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto my-10'>
      {services.map((service, index) => (
        <CustomServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServicesDetails;
