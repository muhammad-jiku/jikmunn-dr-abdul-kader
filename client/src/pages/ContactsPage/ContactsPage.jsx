import React from 'react';
import bgImg from '../../assets/images/bg3.jpg';
import { CustomBanner, ContactDetails } from '../../components';

const ContactsPage = () => {
  const bannerData = {
    heading: 'Contacts',
    subHeading1: 'Contacts',
    subHeading2: '',
    image: `${bgImg}`,
  };

  return (
    <>
      <CustomBanner data={bannerData} />
      <ContactDetails />
    </>
  );
};

export default ContactsPage;
