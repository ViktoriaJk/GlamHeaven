import { FC } from 'react';
import nars from '../assets/images/nars300w300h.jpg';

const Aside: FC = () => {
  return (
    <aside>
      <div>Cart</div>
      <div>Trending</div>
      <div className='ad_panel'>
        <img src={nars} alt='nars' />
      </div>
    </aside>
  );
};

export default Aside;
