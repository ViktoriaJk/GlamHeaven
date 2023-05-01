import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';
import { User } from '../models/User';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const secretKey = process.env.JWT_SECRET as string;

describe('POST /api/order/', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Product.deleteMany();
  });

  it('should return status 200 and user cart data', async () => {
    const user = await User.create({
      sub: '12345678910',
      name: 'TestUser',
      email: 'testuser@gmail.com',
      given_name: 'username',
      picture: 'http',
    });
    const token = jwt.sign(user.toJSON(), secretKey);

    const product_1 = await Product.create({
      id: 1,
      name: 'NARS Afterglow Lip Balm',
      brand: 'NARS',
      api_featured_image: 'www.lookfantastic/nars/afterglow.com',
      price: 5,
      price_sign: '€',
      currency: 'EURO',
      product_type: 'lip_balm',
    });

    const product_2 = await Product.create({
      id: 1,
      name: 'NARS Afterglow Lip Balm',
      brand: 'NARS',
      api_featured_image: 'www.lookfantastic/nars/afterglow.com',
      price: 7,
      price_sign: '€',
      currency: 'EURO',
      product_type: 'lip_balm',
    });

    // given
    await Cart.create([
      {
        userId: user._id,
        products: [
          {
            productId: product_1._id,
            quantity: 1,
            unitPrice: 5,
            totalPrice: 5,
          },
          {
            productId: product_2._id,
            quantity: 1,
            unitPrice: 7,
            totalPrice: 7,
          },
        ],
        totalCartPrice: 12,
      },
    ]);

    const orderFormData = {
      invoiceAddress: {
        zipCode: 'HU4400',
        city: 'Nyíregyháza',
        street: 'Park utca',
        houseNumber: '11',
        country: 'Hungary',
      },
      deliveryAddress: {
        zipCode: 'HU4400',
        city: 'Nyíregyháza',
        street: 'Park utca',
        houseNumber: '11',
        country: 'Hungary',
      },
      details: {
        phoneNumber: '+36 01 234 5678',
        deliveryOption: '1',
        paymentMethod: '2',
      },
    };

    // when
    const response = await request(app)
      .post('/api/order/')
      .send({ orderFormData: orderFormData })
      .set('Authorization', `Bearer ${token}`);

    // then
    const dbContent = await Order.findOne({ userId: user._id });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order saved.');
  });
});
