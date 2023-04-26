import { FC, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';

const SearchInput: FC = () => {
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
      <input
        className='inputbox inputbox--searchMod'
        value={search}
        onChange={loadSearch}
        type='text'
        autoComplete='off'
        placeholder='Search for a product...'
      />
      <span className='search_icon'>
        <GoSearch />
      </span>
    </>
  );
};

export default SearchInput;
