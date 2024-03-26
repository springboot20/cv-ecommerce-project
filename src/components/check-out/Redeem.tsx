import React, { useState } from 'react';

const Redeem = () => {
  const [redeemCode, setRedeemCode] = useState('');

  return (
    <div className='shadow rounded-md mt-6 p-4 bg-white grid items-center'>
      <div className='flex '>
        <div className='flex-1'>
          <input className='block w-full rounded-l-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' type='text' id='redeemCode' placeholder='Promo code' aria-label='Search' value={redeemCode} onChange={(event) => setRedeemCode(event.target.value)} />
        </div>
        <button type='button' className='py-3 px-7 font-semibold cursor-pointer text-white rounded-r-md bg-indigo-700 hover:bg-indigo-600 transition-all'>
          <span className='text-xl'>REDEEM</span>
        </button>
      </div>
    </div>
  );
};

export default Redeem;
