import googleUrl from '../utility/googleUrl';
import { FC, ReactNode } from 'react';
import { $user } from '../states/user';
import useGlobal from '../hooks/useGlobal';
import { login, logout } from '../states/user';
import { FaUserCircle, FaRegHeart, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineLocalShipping, MdLogout } from 'react-icons/md';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// type Props = {
//   children: ReactNode;
// };

const LoginButton: FC = () => {
  const url = googleUrl();
  const user = useGlobal($user);
  const [isShown, setIsShown] = useState(false);

  const toastCall = () => {
    return toast.success('You have successfully logged out!');
  };

  return (
    <>
      {!user ? (
        <a href={url} className='button'>
          <span className='button_icon'>
            <FaUserCircle />
          </span>
          <span className='button_text'>LOGIN</span>
        </a>
      ) : (
        <>
          <div className='user_dropdown_container'>
            <div
              onMouseOver={() => setIsShown(true)}
              onClick={() => setIsShown(!isShown)}
              className='button'>
              <span className='button_icon'>
                <img
                  src={user.picture}
                  alt='avatar'
                  className='avatar_image'
                  referrerPolicy='no-referrer'
                />
              </span>
              <span className='button_text'>{user.given_name}</span>
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
              <a
                href={'/'}
                onClick={() => {
                  logout();
                  toastCall();
                }}>
                <span>
                  <MdLogout />
                </span>
                Logout
              </a>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};

export default LoginButton;
