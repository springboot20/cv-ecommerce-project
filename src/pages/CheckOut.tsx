import CheckOutForm from '../components/check-out/CheckOutForm';
import Shoe from '../assets/running-shoes-sneakers.png';

const CheckOut = () => {
  return (
    <main className='mt-40 pt-8'>
      <div className='container mx-auto px-12 max-w-[86rem] lg:max-w-[87rem] xl:max-w-[95rem] 2xl:max-w-[110rem] mb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <CheckOutForm className='mb-12' />
          <div>
            <img src={Shoe} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOut;
