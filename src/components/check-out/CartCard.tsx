import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../helpers';

const CartCard = () => {
  const { cart } = useCart();

  return (
    <div className='bg-white rounded-xl shadow mt-3'>
      {cart.length === 0 ? (
        <>
          <div className='cart-card border-[0.12rem] flex justify-between p-3 h-24 md:h-22 items-center'>
            <div className=''>
              <h1 className='text-xl font-bold text-gray-600'>Product name</h1>
              <p className='text-lg font-semibold text-gray-600'>Brief description</p>
            </div>
            <p className='text-lg font-bold text-gray-600'>$12</p>
          </div>
          <div className='cart-card border-[0.12rem] flex justify-between p-3 h-24 md:h-22 items-center'>
            <div className=''>
              <h1 className='text-xl font-bold text-gray-600'>Product name</h1>
              <p className='text-lg font-semibold text-gray-600'>Brief description</p>
            </div>
            <p className='text-lg font-bold text-gray-600'>$12</p>
          </div>
          <div className='cart-card border-[0.12rem] flex justify-between p-3 h-24 md:h-22 items-center'>
            <div className=''>
              <h1 className='text-xl font-bold text-gray-600'>Product name</h1>
              <p className='text-lg font-semibold text-gray-600'>Brief description</p>
            </div>
            <p className='text-lg font-bold text-gray-600'>$12</p>
          </div>
          <div className='cart-card border-[0.12rem] flex justify-between p-3 h-24 md:h-22 items-center active'>
            <div className=''>
              <h1 className='text-xl font-bold text-gray-600'>Product name</h1>
              <p className='text-lg font-semibold text-gray-600'>Brief description</p>
            </div>
            <p className='text-lg font-bold text-gray-600'>$12</p>
          </div>
          <div className='cart-card border-[0.12rem] flex justify-between p-3 h-24 md:h-22 items-center'>
            <div className=''>
              <h1 className='text-xl font-bold text-gray-600'>Product name</h1>
              <p className='text-lg font-semibold text-gray-600'>Brief description</p>
            </div>
            <p className='text-lg font-bold text-gray-600'>$12</p>
          </div>
        </>
      ) : (
        cartItems.map(({ _id, productName, quantity, price }) => (
          <div
            className='cart-card border-[0.12rem] flex justify-between p-3 h-24 md:h-22 items-center'
            key={_id}>
            <div className=''>
              <h1 className='text-xl font-bold text-gray-600'>{productName}</h1>
              <p className='text-lg font-semibold text-gray-600'>{quantity}</p>
            </div>
            <p className='text-lg font-bold text-gray-600'>{formatPrice(price)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartCard;
