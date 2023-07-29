import React from 'react';

const CustomLocation = () => {
  return (
    <>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.422656571529!2d91.39424141496751!3d23.00824858496032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375368305397cec9%3A0xa41cb54e877078f3!2sNew%20Popular%20Diagnostic%20Center%2CFeni!5e0!3m2!1sen!2sbd!4v1687616572566!5m2!1sen!2sbd'
        className='w-full'
        height='600'
        style={{ border: 0 }}
        // allowfullscreen={true}
        allowFullScreen={true}
        loading='lazy'
        // referrerpolicy='no-referrer-when-downgrade'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </>
  );
};

export default CustomLocation;
