import { FC, ReactNode } from 'react';
import type { ProductType } from '../api/product';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/product';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import { addToCart } from '../api/cart';
import toast, { Toaster } from 'react-hot-toast';
import useGlobal from '../hooks/useGlobal';
import { $user } from '../states/user';

type ProductParams = {
  id: string;
};

const ProductPage = () => {
  const { id } = useParams<ProductParams>();

  const addToCartHandler = (id: string) => {
    addToCart(id, 1);
    if (user) toast.success('Item added to your shopping cart!');
    else toast.error('You must log in to add an item to your cart!');
  };

  const user = useGlobal($user);

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
      {product ? (
        <>
          {loading && <Loader />}
          <div className='product_page_container'>
            <div>
              <img src={product.api_featured_image} alt='product image' />
            </div>
            <div className='product_page_details'>
              <h2>{product.brand}</h2>
              <h1 id='category_name'>{product.name.toUpperCase()}</h1>
              <p>{`${product.price_sign}${product.price}`}</p>
              <div
                className='button'
                onClick={() => addToCartHandler(product._id)}>
                ADD TO CART
              </div>
            </div>
          </div>
          <div>
            <h3>DESCRIPTION</h3>
            <p>{product.description}</p>
          </div>
          <hr />
          <div>
            <h3>CUSTOMER REVIEWS</h3>
          </div>
        </>
      ) : (
        <div>{error ? <p>{error}</p> : <p></p>}</div>
      )}
    </>
  );
};

export default ProductPage;
