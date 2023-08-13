import React from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const PriceRow = ({ price }) => {
  const navigate = useNavigate();
  const handleDeletePrice = () => {};

  return (
    <tr>
      <th>{price?.priceID}</th>
      <th>{price?.title}</th>
      <th>{price?.price}</th>
      <th>{String(price?.createdAt).substr(0, 10)}</th>
      <th className='flex'>
        <button
          className='btn bg-green-600 text-white hover:bg-green-500 rounded-full font-bold mr-2'
          onClick={() => navigate(`/dashboard/admin/price/${price?._id}`)}
        >
          <AiOutlineEdit className='text-md' />
        </button>
        <button
          className='btn bg-red-600 text-white hover:bg-red-500 rounded-full font-bold'
          onClick={handleDeletePrice}
        >
          <AiFillDelete className='text-md' />
        </button>
      </th>
    </tr>
  );
};

export default PriceRow;
