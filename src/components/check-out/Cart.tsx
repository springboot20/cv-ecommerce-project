import Header from './Header';
import CartCard from './CartCard';
import Redeem from './Redeem';

const Cart = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Header />
      <CartCard />
      <Redeem />
    </div>
  );
};

export default Cart;
