import React from 'react';
import {
  Banner,
  Features,
  About,
  Services,
  Testimonials,
  Prices,
  Appointment,
  Partners,
  Location,
} from '../../components';
import { MetaDataTitle } from '../../utils';

const HomePage = () => {
  return (
    <>
      <MetaDataTitle title='Home - Dr. Abdul Kader' />
      <Banner />
      <Features />
      <About />
      <Services />
      <Testimonials />
      <Prices />
      <Appointment />
      <Partners />
      <Location />
    </>
  );
};

export default HomePage;
