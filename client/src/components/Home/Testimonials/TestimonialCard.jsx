import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import profileImg from '../../../assets/images/default_profile_avatar.png';
import {
  allTestimonials,
  clearErrors,
} from '../../../actions/testimonialActions';
import { toast } from 'react-toastify';
// import '../../../styles/testimonial.css';

const TestimonialCard = () => {
  const dispatch = useDispatch();
  const { loading, error, testimonials } = useSelector(
    (state) => state?.allTestimonials
  );

  useEffect(() => {
    dispatch(allTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className='p-4'>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Parallax, Pagination, Navigation]}
      >
        <div slot='container-start' data-swiper-parallax='-23%'></div>
        {testimonials?.map((t, i) => (
          <SwiperSlide key={i}>
            <div className='p-4' data-swiper-parallax='-100'>
              <p className='text-black text-sm text-justify'>
                {t?.testimonial}
              </p>
              <div className='flex items-center my-4 space-x-3 cursor-pointer'>
                <img
                  className='w-10 h-10 rounded-full'
                  src={t?.image?.length > 0 ? t?.image : profileImg}
                  loading='lazy'
                  alt={t ? t?.username : 'user'}
                />
                <div className='block space-y-1 font-medium'>
                  <p className='text-xs'>
                    {t?.username}
                    <time className='block text-xs text-gray'>
                      {String(t?.createdAt).substr(0, 10)}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCard;
