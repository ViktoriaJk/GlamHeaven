import { useState, useEffect } from 'react';
import type { SearchProductListType } from '../api/search';
import { useLocation, useParams } from 'react-router-dom';
import { getSearchResult } from '../api/search';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import ProductListItemBlock from '../components/ProductListItemBlock';

type SearchParams = {
  query: string | undefined;
};

const SearchPage = () => {
  const { state } = useLocation();
  const query = state;

  const {
    data: products,
    loading,
    error,
    reload,
  } = useApi<SearchProductListType>(() => getSearchResult(query));

  useEffect(() => {
    reload();
  }, [query]);

  return (
    <>
      {products ? (
        <>
          <h1 id='category_name'>Results for “{query}”</h1>
          <p id='category_result'>{products.length} results</p>
          {loading && <Loader />}
          <ProductListItemBlock products={products} />
        </>
      ) : (
        <div>
          {error ? <p>{error}</p> : <p>Please search for a product.</p>}
        </div>
      )}
    </>
  );
};

export default SearchPage;
