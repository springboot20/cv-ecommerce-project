/** @format */

import React from 'react';
import { CardHeader } from '@material-tailwind/react';

export const CustomCarousel: React.FC<{ productImage: React.ReactNode }> = ({ productImage }) => {
  return (
    <CardHeader shadow={false} className='w-full border-2 border-black/40'>
      {productImage}
    </CardHeader>
  );
};
