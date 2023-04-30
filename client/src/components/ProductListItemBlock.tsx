import { FC, createContext } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { addToCart } from '../api/cart';
import toast, { Toaster } from 'react-hot-toast';
import useGlobal from '../hooks/useGlobal';
import { $user } from '../states/user';

type Props = {
  products: {
    _id: string;
    api_featured_image: string;
    name: string;
    price?: number | null | undefined;
    price_sign?: string | null | undefined;
  }[];
};

const ProductListItemBlock: FC<Props> = ({ products }) => {
  const addToCartHandler = (id: string) => {
    addToCart(id, 1);
    if (user) toast.success('Item added to your shopping cart!');
    else toast.error('You must log in to add an item to your cart!');
  };

  const user = useGlobal($user);

  return (
    <>
      <div className='product_list_container'>
        {products.map((product) => (
          <div className='product_list_item' key={product._id}>
            <a href={`/product/${product._id}`}>
              <div className='product_list_item_image_container'>
                <img src={product.api_featured_image} alt='product image' />
              </div>
              <div className='product_list_item_name'>{product.name}</div>
              <div className='product_list_item_price'>{`${product.price_sign}${product.price}`}</div>
            </a>
            <div className='wishlist_heart'>
              <FaRegHeart />
            </div>
            <div
              className='button'
              onClick={() => addToCartHandler(product._id)}>
              ADD TO CART
            </div>
          </div>
        ))}
        <div className='product_list_item'></div>
        <div className='product_list_item'></div>
      </div>
      <Toaster />
    </>
  );
};

export default ProductListItemBlock;
