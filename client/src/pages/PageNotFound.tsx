import page_not_found from '../assets/images/page_not_found.jpg';

export const PageNotFound = () => {
  return (
    <div className='page_not_found_container'>
      <img src={page_not_found} alt='page not found' />
    </div>
  );
};
