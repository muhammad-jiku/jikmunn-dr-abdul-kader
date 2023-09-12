import React from 'react';
// internal imports
import FeaturesCard from './FeaturesCard';
import medicalTreatmentImg from '../../../assets/images/treatment.png';
import emergencyHelpImg from '../../../assets/images/emergency.png';
import regularExaminationImg from '../../../assets/images/examination.png';

const Features = () => {
  const data = [
    {
      name: 'Medical Treatment',
      description:
        'Management and care of a patient to combat disorder or diseases.',
      image: `${medicalTreatmentImg}`,
    },
    {
      name: 'Emergency Help',
      description:
        'We have special equipment to give emergency help if/when necessary.',
      image: `${emergencyHelpImg}`,
    },
    {
      name: 'Regular Examination',
      description: 'Make online appointments for regular health examinations.',
      image: `${regularExaminationImg}`,
    },
  ];

  return (
    <div className='container mx-auto my-10 p-3 min-h-screen'>
      <div className='flex flex-col lg:flex-row justify-center md:justify-around container mx-auto my-6'>
        {data.map((feature, index) => (
          <FeaturesCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;
