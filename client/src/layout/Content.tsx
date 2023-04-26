import { FC } from 'react';
import Main from './Main';
import Aside from './Aside';

const Content: FC = () => {
  return (
    <div className='content'>
      <Main />
      <Aside />
    </div>
  );
};

export default Content;
