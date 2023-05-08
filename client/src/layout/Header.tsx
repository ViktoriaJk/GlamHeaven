import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useGlobal from '../hooks/useGlobal';
import { $user } from '../states/user';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import logo from '../assets/images/logo_400w.png';
import SearchInput from '../components/SearchInput';
import SearchButton from '../components/SearchButton';
import CartButton from '../components/CartButton';
import { BiCategoryAlt } from 'react-icons/bi';

type Props = {
  navigate: (path: string) => any;
};

const Navbar: FC = () => {
  const user = useGlobal($user);

  const toggleSearch = () => {
    let x: HTMLElement | null = document.getElementById('header_search');
    if (x) {
      if (x.classList.contains('header_search-mobShow')) {
        x.classList.remove('header_search-mobShow');
      } else {
        x.classList.add('header_search-mobShow');
      }
    }
  };

  const navigate = useNavigate();

  const [scroll, setScroll] = useState<boolean>(true);

  useEffect(() => {
    let x: HTMLElement | null = document.getElementById('header_search');
    window.onresize = function (event) {
      if (x) {
        x.classList.remove('header_search-mobShow');
      }
    };

    document.addEventListener('scroll', () => {
      const scrollCheck = window.scrollY > 70;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  return (
    <header className={`${scroll && 'header--shadow'}`}>
      <div className='header_container'>
        <div className='header_logo' onClick={() => navigate('/')}>
          <img src={logo} alt='GlamHeaven logo' />{' '}
        </div>
        <div className='header_nav'>
          <div className='button' onClick={() => navigate('/categories')}>
            <span className='button_icon'>
              <BiCategoryAlt />
            </span>
            <span className='button_text'>Categories</span>
          </div>
        </div>
        <div className='header_search' id='header_search'>
          <SearchInput />
        </div>
        <div className='header_search_onlyicon' onClick={toggleSearch}>
          <SearchButton />
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
