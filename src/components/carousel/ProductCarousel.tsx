import React from 'react';
import { Card, CardHeader, Typography, CardBody, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import { settings } from '../../util/slickSlider.config';

type CarouselProps = {
  items: {
    img: string;
    description: string;
    price: number;
  }[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const ProductCarousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4'>
      {items.map((item,index) => {
        return (
          <Card
            key={index}
            placeholder='carousel item'
            className={classNames('h-auto rounded-xl', '')}>
            <CardHeader
              shadow={false}
              className={classNames(
                'p-0 m-0 h-72 rounded-t-xl border-b border-black/20 rounded-b-none flex justify-center items-center'
              )}>
              <img src={item.img} alt='carousel img' className='h-44 w-44 rounded-full' />
            </CardHeader>
            <CardBody className='flex flex-col items-center justify-center py-8'>
              <Typography>{item.description}</Typography>
              <div className='flex w-full items-center justify-between mt-9'>
                <Typography className='text-base text-gray-500 font-medium italic'>
                  $ {item.price}
                </Typography>
                <Link to='/'>
                  <Button>explore</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};
