import { FC, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';

const SearchButton: FC = () => {
  const [color, setColor] = useState('red');

  const navigate = useNavigate();

  const [search, setSearch] = useState<string | undefined>('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      //console.log(search);
      if (search) {
        navigate(`/search/${search}`, { state: search });
      }
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const loadSearch = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className='button'>
        <span className='button_icon'>
          <GoSearch />
        </span>
      </div>
    </>
  );
};

export default SearchButton;
