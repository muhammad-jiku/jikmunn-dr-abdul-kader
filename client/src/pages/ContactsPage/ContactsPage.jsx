import React from 'react';
// internal imports
import { MetaDataTitle } from '../../utils';
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
      <MetaDataTitle title='Contact - Dr. Abdul Kader' />
      <CustomBanner data={bannerData} />
      <ContactDetails />
    </>
  );
};

export default ContactsPage;
