import useGlobal from '../hooks/useGlobal';
import { getCategories } from '../api/categories';
import type { CategoryType } from '../api/categories';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';

const Categories = () => {
  const {
    data: categories,
    loading,
    error,
    reload,
  } = useApi<CategoryType>(() => getCategories());

  return (
    <div className=''>
      <section className=''>
        <h1 className=''>ALL CATEGORIES</h1>
        {categories ? (
          <div className='category_list_container'>
            {categories.map((category) => (
              <div className='category_list_item' key={category.ufUrl}>
                <a href={'/category/' + category.ufUrl}>
                  <img
                    src={`/src/assets/images/categories/${category.ufUrl}.jpg`}
                    alt='category picture'
                  />
                  {category.name}
                </a>
              </div>
            ))}
            <div className='category_list_item'></div>
            <div className='category_list_item'></div>
          </div>
        ) : (
          <>
            <p></p>
          </>
        )}
      </section>
    </div>
  );
};

export default Categories;
