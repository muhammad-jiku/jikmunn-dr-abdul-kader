import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../styles/testimonial.css';

// import required modules
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';

const TestimonialCard = () => {
  const data = [
    {
      name: 'Ekram',
      review:
        'Fancy is bleak spoken back hopes unbroken sat a. Word oh chamber the press vainly, and no burden radiant i this, door vainly nearly back of nothing, my its nightly dream heaven whom the my or we, nothing disaster streaming so there, thy he grim broken bird a the the violet, bird not angels i whom quaff what something soul shall. Devil this shore unbroken nevermore hath chamber he was, that into lonely its footfalls placid my at. Tell the then smiling decorum soul. Evilprophet he door my radiant. Angels unbrokenquit not out into, was again throws the so the but clasp burning. More i and lining on a radiant croaking chamber, one that feather when and i quoth thrilled i, master meant and lining raven with this theeby soul, these spoken but still floor distinctly lamplight home let. What the lie my bird my, and his whether and devil.',
    },
    {
      name: 'Rashed',
      review:
        'Fancy is bleak spoken back hopes unbroken sat a. Word oh chamber the press vainly, and no burden radiant i this, door vainly nearly back of nothing, my its nightly dream heaven whom the my or we, nothing disaster streaming so there, thy he grim broken bird a the the violet, bird not angels i whom quaff what something soul shall. Devil this shore unbroken nevermore hath chamber he was, that into lonely its footfalls placid my at. Tell the then smiling decorum soul. Evilprophet he door my radiant. Angels unbrokenquit not out into, was again throws the so the but clasp burning. More i and lining on a radiant croaking chamber, one that feather when and i quoth thrilled i, master meant and lining raven with this theeby soul, these spoken but still floor distinctly lamplight home let. What the lie my bird my, and his whether and devil.',
    },
    {
      name: 'Iqbal',
      review:
        'Fancy is bleak spoken back hopes unbroken sat a. Word oh chamber the press vainly, and no burden radiant i this, door vainly nearly back of nothing, my its nightly dream heaven whom the my or we, nothing disaster streaming so there, thy he grim broken bird a the the violet, bird not angels i whom quaff what something soul shall. Devil this shore unbroken nevermore hath chamber he was, that into lonely its footfalls placid my at. Tell the then smiling decorum soul. Evilprophet he door my radiant. Angels unbrokenquit not out into, was again throws the so the but clasp burning. More i and lining on a radiant croaking chamber, one that feather when and i quoth thrilled i, master meant and lining raven with this theeby soul, these spoken but still floor distinctly lamplight home let. What the lie my bird my, and his whether and devil.',
    },
  ];

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
        {data?.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <div className='p-4' data-swiper-parallax='-100'>
              <p className='text-black text-sm'>{testimonial?.review}</p>
              <p className='text-xl my-4'>{testimonial?.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCard;
