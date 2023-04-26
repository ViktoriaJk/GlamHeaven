import googleUrl from '../utility/googleUrl';
import { FC, ReactNode } from 'react';
import { $user } from '../states/user';
import useGlobal from '../hooks/useGlobal';
import { login, logout } from '../states/user';
import { FaUserCircle, FaRegHeart, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineLocalShipping, MdLogout } from 'react-icons/md';
import { useState } from 'react';

// type Props = {
//   children: ReactNode;
// };

const LoginButton: FC = () => {
  const url = googleUrl();
  const user = useGlobal($user);
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      {!user ? (
        <a href={url} className='button'>
          <span>
            <FaUserCircle />
          </span>
          LOGIN
        </a>
      ) : (
        <>
          <div className='user_dropdown_container'>
            <div
              onMouseOver={() => setIsShown(true)}
              onClick={() => setIsShown(!isShown)}
              className='button'>
              <span>
                <img
                  src={user.picture}
                  alt='avatar'
                  className='avatar_image'
                  referrerPolicy='no-referrer'
                />
              </span>
              {user.given_name}
            </div>
            <div
              onMouseLeave={() => setIsShown(false)}
              className={`user_dropdown ${isShown && 'user_dropdown--open'}`}>
              <a href='/user/profile'>
                <span>
                  <FaRegUserCircle />
                </span>
                Profile
              </a>
              <a href='/user/orders'>
                <span>
                  <MdOutlineLocalShipping />
                </span>
                Orders
              </a>
              <a href='/user/wishlist'>
                <span>
                  <FaRegHeart />
                </span>
                Wishlist
              </a>
              <a href={'#'} onClick={logout}>
                <span>
                  <MdLogout />
                </span>
                Logout
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginButton;
