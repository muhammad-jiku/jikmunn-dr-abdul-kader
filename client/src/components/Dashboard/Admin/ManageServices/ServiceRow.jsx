import React from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ServiceRow = ({ service }) => {
  const navigate = useNavigate();
  const handleDeleteService = () => {};

  return (
    <tr>
      <th>{service?.serviceID}</th>
      <th>{service?.title}</th>
      <th>{String(service?.createdAt).substr(0, 10)}</th>
      <th className='flex'>
        <button
          className='btn bg-green-600 text-white hover:bg-green-500 rounded-full font-bold mr-2'
          onClick={() => navigate(`/dashboard/admin/service/${service?._id}`)}
        >
          <AiOutlineEdit className='text-md' />
        </button>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeleteService}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default ServiceRow;
