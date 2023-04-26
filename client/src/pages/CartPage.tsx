import { useEffect } from 'react';
import { FC, ReactNode } from 'react';
import type { CartType } from '../api/cart';
import { getCart } from '../api/cart';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import { deleteFromCart } from '../api/cart';
//import { $user } from '../states/user';
//import useGlobal from '../hooks/useGlobal';

const CartPage = () => {
  const {
    data: cartData,
    loading,
    error,
    reload,
  } = useApi<CartType>(() => getCart());

  //const user = useGlobal($user);

  const removeCartItemHandler = (id: string) => {
    deleteFromCart(id);
    reload();
  };

  return (
    <>
      {cartData ? (
        <>
          <h1>Cart</h1>
          {loading && <Loader />}
          <div>
            {cartData.products.map((product) => (
              <div key={product.productId._id}>
                <a href={`/product/${product.productId._id}`}>
                  {product.productId.name}
                  {product.quantity}
                </a>
                <div
                  className='button'
                  onClick={() => removeCartItemHandler(product.productId._id)}>
                  REMOVE
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>{error ? <p>{error}</p> : <p>No products.</p>}</div>
      )}
    </>
  );
};

export default CartPage;
