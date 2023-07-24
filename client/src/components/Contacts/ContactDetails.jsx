import React from 'react';
import addressImg from '../../assets/images/address-icon.png';
import emailImg from '../../assets/images/email-icon.png';
import mobileImg from '../../assets/images/mobile-icon.png';
import ContactCard from './ContactCard';
import { CustomLocation } from '..';

const ContactDetails = () => {
  const data = [
    {
      name: 'Address',
      description: '310 Razzak Complex, SSK Road, Feni',
      image: `${addressImg}`,
    },
    {
      name: 'Email',
      description: 'infoclinic@medicine.com',
      image: `${emailImg}`,
    },
    {
      name: 'Phone',
      description: '+880 183 227 8260',
      image: `${mobileImg}`,
    },
  ];

  <>
    <div className='mt-2 min-h-screen'>
      <div className='container mx-auto my-2 p-10 flex flex-col justify-center items-center'>
        <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider'>
          Get In Touch
        </h2>
        <h2 className='text-lg lg:text-xl font-semibold font-oswald text-gray tracking-widest my-2'>
          how to find us
        </h2>
        <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-1 container mx-auto my-10'>
          {data.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      </div>
      <CustomLocation />
    </div>
  </>;
};

export default ContactDetails;
