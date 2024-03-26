import { useCart } from '../../context/product/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  return (
    <header className='flex justify-between items-center'>
      <h2 className='text-xl text-gray-600 font-bold'>Your cart</h2>
      <div className='h-10 w-10 rounded-full bg-violet-600 flex items-center justify-center text-center'>
        <span className='text-md text-white font-bold'>
          {cartItems.length === 0 ? 0 : cartItems.length}
        </span>
      </div>
    </header>
  );
};

export default Header;
