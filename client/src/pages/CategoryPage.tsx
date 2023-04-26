import { getCategory } from '../api/category';
import type { CategoryProductListType } from '../api/category';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import ProductListItemBlock from '../components/ProductListItemBlock';

type CategoryParams = {
  url: string;
};

const Category = () => {
  const { url } = useParams<CategoryParams>();

  const {
    data: categoryData,
    loading,
    error,
    reload,
  } = useApi<CategoryProductListType>(() => getCategory(url));

  return (
    <>
      {categoryData ? (
        <>
          <h1 id='category_name'>{categoryData.category.name.toUpperCase()}</h1>
          <p id='category_result'>{categoryData.products.length} results</p>
          {loading && <Loader />}
          <ProductListItemBlock products={categoryData.products} />
        </>
      ) : (
        <div>{error ? <p>{error}</p> : <p></p>}</div>
      )}
    </>
  );
};

export default Category;
