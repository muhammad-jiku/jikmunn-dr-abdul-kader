import React from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';

const ServiceRow = ({ service }) => {
  return (
    <tr>
      <th>{service?.serviceID}</th>
      <th>{service?.title}</th>
      <th>{String(service?.createdAt).substr(0, 10)}</th>
      <th className='flex'>
        <label
          htmlFor='delete-modal'
          className='btn btn-error bg-green-600 text-white font-bold mr-2'
        >
          <AiOutlineEdit className='text-lg' />
        </label>
        <label
          htmlFor='delete-modal'
          className='btn btn-error bg-red-600 text-white font-bold'
        >
          <AiFillDelete className='text-lg' />
        </label>
      </th>
    </tr>
  );
};

export default ServiceRow;
