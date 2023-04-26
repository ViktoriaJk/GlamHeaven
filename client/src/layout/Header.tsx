import { FC, useEffect, useState } from 'react';
import useGlobal from '../hooks/useGlobal';
import { $user } from '../states/user';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import logo from '../assets/images/logo_400w.png';
import SearchInput from '../components/SearchInput';
import CartButton from '../components/CartButton';

type Props = {
  navigate: (path: string) => any;
};

const Navbar: FC = () => {
  const user = useGlobal($user);

  const navigate = useNavigate();

  return (
    <header>
      <div className='header_container'>
        <div className='header_logo' onClick={() => navigate('/')}>
          {' '}
          <img src={logo} alt='GlamHeaven logo' />{' '}
        </div>
        <div className='header_nav'>
          <div
            className='header_nav_item'
            onClick={() => navigate('/categories')}>
            Categories
          </div>
        </div>
        <div className='header_search'>
          <SearchInput />
        </div>
        <div className='header_user'>
          <LoginButton />
        </div>
        <div className='header_cart'>
          <CartButton />
        </div>
      </div>

      {/* <button onClick={() => navigate('/second')}>Second</button>
      <button onClick={() => navigate('/third')}>Third</button> */}

      {/* {user && <h2>Hello {user.email}</h2>}
      {hasMessages ? <h1>You have new notifications</h1> : <h1>No messages</h1>} */}
    </header>
  );
};

export default Navbar;
