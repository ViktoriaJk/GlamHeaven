import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const secretKey = process.env.JWT_SECRET as string;

describe('GET /api/cart/', () => {
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

    // when
    const response = await request(app)
      .get('/api/cart/')
      .set('Authorization', `Bearer ${token}`);

    // then
    const dbContent = await Cart.findOne({ userId: user._id }).populate(
      'products.productId',
      'name price price_sign api_featured_image'
    );
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
  });
});
