import React from 'react';
// external imports
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  MdWorkOutline,
  MdOutlineSchool,
  MdOutlineStarBorderPurple500,
} from 'react-icons/md';
// internal import
import styles from '../../styles/timeline.module.css';

const AboutTimeline = () => {
  return (
    <>
      <VerticalTimeline lineColor='#000'>
        {/* 1st */}
        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='2016'
          dateClassName={`${styles.dateInfo}`}
          contentStyle={{
            background: 'rgb(233, 30, 99)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(233, 30, 99)',
          }}
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<MdOutlineSchool />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            M.B.B.S
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Cumilla Medical College, Cumilla, Bangladesh
          </h4>
        </VerticalTimelineElement>
        {/* 2nd */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2016-2017'
          dateClassName={`${styles.dateInfo}`}
          contentStyle={{
            background: 'rgb(233, 30, 99)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(233, 30, 99)',
          }}
          // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<MdWorkOutline />}
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<MdOutlineSchool />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            Internship Training Programme
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Cumilla Medical College, Cumilla, Bangladesh
          </h4>
        </VerticalTimelineElement>
        {/* 3rd */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2018'
          dateClassName={`${styles.dateInfo}`}
          contentStyle={{
            background: 'rgb(233, 30, 99)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(233, 30, 99)',
          }}
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<MdOutlineSchool />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            C.M.U ( Certificate in Medical Ultrasound )
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Center for Medical Ultrasound & Doppler (CMUD) Pvt. Ltd, Chattogram,
            Bangladesh
          </h4>
          {/* <p>User Experience, Visual Design</p> */}
        </VerticalTimelineElement>
        {/* 4th */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2019'
          dateClassName={`${styles.dateInfo}`}
          contentStyle={{
            background: 'rgb(233, 30, 99)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(233, 30, 99)',
          }}
          // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<MdWorkOutline />}
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<MdOutlineSchool />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            C.C.D ( Certificate Course on Diabetology )
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            BIRDEM General Hospital, Dhaka, Bangladesh
          </h4>
        </VerticalTimelineElement>
        {/* 5th */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2019'
          dateClassName={`${styles.dateInfo}`}
          contentStyle={{
            background: 'rgb(233, 30, 99)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(233, 30, 99)',
          }}
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<MdOutlineSchool />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            B.C.S ( Health )
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Ministry of Health and Family Welfare govt. Bangaldesh
          </h4>
          {/* <p>User Experience, Visual Design</p> */}
        </VerticalTimelineElement>
        {/* 6th */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(33, 150, 243)',
          }}
          date='2018'
          dateClassName={`${styles.dateInfo}`}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MdWorkOutline />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            Residential Medical Officer
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Brahmanbaria Mothercare General Hospital, Brahmanbaria, Bangladesh
          </h4>
        </VerticalTimelineElement>
        {/* 7th */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(33, 150, 243)',
          }}
          date='2019'
          dateClassName={`${styles.dateInfo}`}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MdWorkOutline />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            Residential Medical Officer
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Midway Medical Center, Hajiganj, Bangladesh
          </h4>
        </VerticalTimelineElement>
        {/* 8th */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(33, 150, 243)',
          }}
          date='2019-2022'
          dateClassName={`${styles.dateInfo}`}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MdWorkOutline />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            Assistant Surgeon
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Upazilla Health Complex, Mithamain, Kishoreganj, Bangladesh
          </h4>
        </VerticalTimelineElement>
        {/* 9th */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '7px solid  rgb(33, 150, 243)',
          }}
          date='2022-Present'
          dateClassName={`${styles.dateInfo}`}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MdWorkOutline />}
        >
          <h3 className='vertical-timeline-element-title text-lg font-bold'>
            Assistant Surgeon
          </h3>
          <h4 className='vertical-timeline-element-subtitle mt-2 text-sm font-semibold'>
            Upazilla Health Complex, Sonagazi, Feni, Bangladesh
          </h4>
        </VerticalTimelineElement>

        {/* final */}
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<MdOutlineStarBorderPurple500 />}
        />
      </VerticalTimeline>
    </>
  );
};

export default AboutTimeline;
