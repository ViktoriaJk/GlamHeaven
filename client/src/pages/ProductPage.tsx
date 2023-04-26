import { FC, ReactNode } from 'react';
import useGlobal from '../hooks/useGlobal';
import type { ProductType } from '../api/product';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/product';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import { $user } from '../states/user';

type ProductParams = {
  id: string;
};

const ProductPage = () => {
  const { id } = useParams<ProductParams>();

  const {
    data: product,
    loading,
    error,
    reload,
  } = useApi<ProductType>(() => getProduct(id));

  //const user = useGlobal($user);

  if (!id || !product) {
    return (
      <>
        <div>{error ? <p>{error}</p> : <p>Error</p>}</div>
      </>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <h1>{product.name}</h1>
    </>
  );
};

export default ProductPage;
