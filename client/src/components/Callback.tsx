import { FC, useEffect } from 'react';
import { login } from '../states/user';
import { useNavigate } from 'react-router-dom';

export const Callback: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');

    if (code)
      login(code, {
        onSuccess: () => navigate('/'),
        onError: () => navigate('/'),
      });
  }, []);

  return <div>callback</div>;
};
