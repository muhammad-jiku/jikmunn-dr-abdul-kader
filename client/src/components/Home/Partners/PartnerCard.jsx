import React from 'react';
import dentalImg from '../../../assets/images/dental-icon.png';
import labImg from '../../../assets/images/white-microscope-icon.png';
import healthyImg from '../../../assets/images/white-healthy-icon.png';
import researchImg from '../../../assets/images/white-research-icon.png';
import umbrellaImg from '../../../assets/images/white-umbrella-icon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import '../../../styles/testimonial.css';

const PartnerCard = () => {
  const data = [
    {
      name: 'United Healthcare',
      image: `${healthyImg}`,
    },
    {
      name: 'Research Lab',
      image: `${researchImg}`,
    },
    {
      name: 'First Dental',
      image: `${dentalImg}`,
    },
    {
      name: 'Umbrella Insurance',
      image: `${umbrellaImg}`,
    },
    {
      name: 'Quick Lab',
      image: `${labImg}`,
    },
  ];

  return (
    <div className='p-4'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Pagination]}
      >
        {data?.map((partner, i) => (
          <SwiperSlide key={i}>
            <div className='mx-4 mt-4 mb-10 p-4 flex justify-center items-center border-[1px] border-main drop-shadow-2xl'>
              <img
                src={partner?.image}
                alt={partner?.name}
                className='h-10 w-10 mr-1'
              />
              <p className='text-sm lg:text-md my-4'>{partner?.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PartnerCard;
