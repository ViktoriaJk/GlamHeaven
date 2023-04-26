import { FC } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { addToCart } from '../api/cart';
import toast, { Toaster } from 'react-hot-toast';

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
    toast.success('Successfully added to your cart!');
  };

  return (
    <>
      <div className='category_list_container'>
        {products.map((product) => (
          <>
            <div className='category_list_item' key={product._id}>
              <a href={`/product/${product._id}`}>
                <img src={product.api_featured_image} alt='category product' />
                {product.name}
                <div>{`${product.price_sign}${product.price}`}</div>
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
          </>
        ))}
      </div>
      <Toaster />
    </>
  );
};

export default ProductListItemBlock;
