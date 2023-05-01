import { useEffect, useState } from 'react';
import { FC, ReactNode } from 'react';
import { getCart, CartType, addToCart } from '../api/cart';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import { deleteFromCart } from '../api/cart';
import { saveOrder } from '../api/order';
import toast, { Toaster } from 'react-hot-toast';
//import { $user } from '../states/user';
//import useGlobal from '../hooks/useGlobal';

type OrderDetails = {
  invoiceAddress: {
    zipCode: string;
    city: string;
    street: string;
    houseNumber: string;
    country: string;
  };
  deliveryAddress: {
    zipCode: string;
    city: string;
    street: string;
    houseNumber: string;
    country: string;
  };
  details: {
    phoneNumber: string;
    deliveryOption: number;
    paymentMethod: number;
  };
};

const initialFormValues: OrderDetails = {
  invoiceAddress: {
    zipCode: '',
    city: '',
    street: '',
    houseNumber: '',
    country: '',
  },
  deliveryAddress: {
    zipCode: '',
    city: '',
    street: '',
    houseNumber: '',
    country: '',
  },
  details: {
    phoneNumber: '',
    deliveryOption: 0,
    paymentMethod: 0,
  },
};

const CartPage = () => {
  const {
    data: cartData,
    loading,
    error,
    reload,
  } = useApi<CartType>(() => getCart());

  //const user = useGlobal($user);

  const removeCartItemHandler = async (id: string) => {
    await deleteFromCart(id);
    reload();
  };

  const changeCartItemQuantity = async (id: string, quantity: number) => {
    await addToCart(id, quantity);
    reload();
  };

  const [viewOrderForm, setViewOrderForm] = useState(false);

  const [formValues, setFormValues] = useState<OrderDetails>(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');
    //console.log(e.target);

    setFormValues((prevValues: any) => ({
      ...prevValues,
      [field]: { ...prevValues[field], [subField]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveOrder(formValues);
    toast.success('Thank you for your order!');
  };

  //const [cartProducts, setCartProducts] = useState(cartData || '');

  return (
    <>
      {cartData ? (
        <>
          <h1>Cart</h1>
          {loading && <Loader />}
          <div>
            {cartData.products.map((product) => (
              <div className='cart_row'>
                <a
                  href={`/product/${product.productId._id}`}
                  key={product.productId._id}
                  className='product_row'>
                  <div className='product_row_image'>
                    <img
                      src={product.productId.api_featured_image}
                      alt='product image'
                    />
                  </div>
                  <div className='product_row_name'>
                    {product.productId.name}
                  </div>
                </a>
                <div className='product_row_quantity'>
                  <div
                    className='button'
                    onClick={() => {
                      changeCartItemQuantity(product.productId._id, -1);
                    }}>
                    -
                  </div>
                  <div className='product_row_quantity_current'>
                    {product.quantity}
                  </div>
                  <div
                    className='button'
                    onClick={() => {
                      changeCartItemQuantity(product.productId._id, 1);
                    }}>
                    +
                  </div>
                </div>
                <div className='product_row_price'>
                  {product.productId.price_sign}
                  {product.totalPrice}
                </div>

                <div
                  className='button'
                  onClick={() => removeCartItemHandler(product.productId._id)}>
                  REMOVE
                </div>
              </div>
            ))}
          </div>
          <div>€{cartData.totalCartPrice}</div>
          {!viewOrderForm ? (
            <div className='button' onClick={() => setViewOrderForm(true)}>
              ORDER
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>Invoice Address</h2>
                  <label>
                    Zip Code:
                    <input
                      type='text'
                      name='invoiceAddress.zipCode'
                      value={formValues.invoiceAddress.zipCode}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type='text'
                      name='invoiceAddress.city'
                      value={formValues.invoiceAddress.city}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Street:
                    <input
                      type='text'
                      name='invoiceAddress.street'
                      value={formValues.invoiceAddress.street}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    House Number:
                    <input
                      type='text'
                      name='invoiceAddress.houseNumber'
                      value={formValues.invoiceAddress.houseNumber}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type='text'
                      name='invoiceAddress.country'
                      value={formValues.invoiceAddress.country}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <h2>Delivery Address</h2>
                  <label>
                    Zip Code:
                    <input
                      type='text'
                      name='deliveryAddress.zipCode'
                      value={formValues.deliveryAddress.zipCode}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type='text'
                      name='deliveryAddress.city'
                      value={formValues.deliveryAddress.city}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Street:
                    <input
                      type='text'
                      name='deliveryAddress.street'
                      value={formValues.deliveryAddress.street}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    House Number:
                    <input
                      type='text'
                      name='deliveryAddress.houseNumber'
                      value={formValues.deliveryAddress.houseNumber}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type='text'
                      name='deliveryAddress.country'
                      value={formValues.deliveryAddress.country}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <h2>Contact Details</h2>
                  <label>
                    Phone Number:
                    <input
                      type='text'
                      name='details.phoneNumber'
                      value={formValues.details.phoneNumber}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <h2>Delivery Options</h2>
                  <label>
                    <input
                      type='radio'
                      name='details.deliveryOption'
                      value='0'
                      checked={formValues.details.deliveryOption == 0}
                      onChange={handleChange}
                    />
                    Option 1
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='details.deliveryOption'
                      value='1'
                      checked={formValues.details.deliveryOption == 1}
                      onChange={handleChange}
                    />
                    Option 2
                  </label>
                </div>
                <div>
                  <h2>Payment Method</h2>
                  <label>
                    <select
                      name='details.paymentMethod'
                      value={formValues.details.paymentMethod}
                      onChange={handleChange}>
                      <option value='0'>Method 1</option>
                      <option value='1'>Method 2</option>
                      <option value='2'>Method 3</option>
                    </select>
                  </label>
                </div>
                <button type='submit' className='button'>
                  ORDER
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <p>There are currently no items in your cart.</p>
          )}
        </div>
      )}
      <Toaster />
    </>
  );
};

export default CartPage;
