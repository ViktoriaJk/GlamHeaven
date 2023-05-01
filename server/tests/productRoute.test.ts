import request from 'supertest';
import app from '../app';
import { Product } from '../models/Product';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('GET /api/product/:id', () => {
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
    // await mongoose.connection.db.dropDatabase();
    //jest.clearAllMocks();
  });

  it('should return status 200 and one product', async () => {
    // given
    const product = await Product.create({
      name: 'NARS Afterglow Lip Balm',
      api_featured_image: 'www.lookfantastic/nars/afterglow.com',
      price: 7,
      price_sign: '$',
    });
    // when
    const response = await request(app).get(`/api/product/${product._id}`);
    // then
    const dbContent = await Product.find({});
    expect(dbContent).toHaveLength(1);
    expect(response.body.name).toBe('NARS Afterglow Lip Balm');
    expect(response.status).toBe(200);
  });

  it('should return status 422 if the product id is invalid', async () => {
    // given
    await Product.create({
      name: 'LANEIGE Lip Sleeping Mask',
      api_featured_image: 'www.lookfantastic/laneige/sleepingmask.com',
      price: 8,
      price_sign: '$',
    });
    // when
    const response = await request(app).get('/api/product/12345678910');
    // then
    expect(response.status).toBe(422);
    expect(response.body).toBe('Invalid id.');
  });

  it('should return status 404 if product ID is missing', async () => {
    // when
    const response = await request(app).get('/api/product/');
    // then
    expect(response.status).toBe(404);
    expect(response.body).toBe('Missing product ID.');
  });
});
