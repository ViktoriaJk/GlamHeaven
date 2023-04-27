import { FC } from 'react';
import nars from '../assets/images/nars300w300h.jpg';
import CartSide from '../components/CartSide';

const Aside: FC = () => {
  return (
    <aside>
      <div>
        <CartSide />
      </div>
      <div>Trending</div>
      <div className='ad_panel'>
        <img src={nars} alt='nars' />
      </div>
    </aside>
  );
};

export default Aside;
