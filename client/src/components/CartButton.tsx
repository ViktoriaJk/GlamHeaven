import { FC, ReactNode } from 'react';
import { $user } from '../states/user';
import useGlobal from '../hooks/useGlobal';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// type Props = {
//   children: ReactNode;
// };

const CartButton: FC = () => {
  //const user = useGlobal($user);
  const navigate = useNavigate();

  return (
    <>
      <div className='button' onClick={() => navigate('/cart')}>
        <span>
          <FaShoppingCart />
        </span>
        Cart
      </div>
    </>
  );
};

export default CartButton;
