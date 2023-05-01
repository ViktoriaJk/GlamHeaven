import request from 'supertest';
import app from '../app';
import { Product } from '../models/Product';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('GET /api/search/:query', () => {
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

  it('should return status 200 and products matching the search query', async () => {
    // given
    await Product.create({
      name: 'NARS Afterglow Lip Balm',
      api_featured_image: 'www.lookfantastic/nars/afterglow.com',
      price: 7,
      price_sign: '$',
    });
    await Product.create({
      name: 'LANEIGE Lip Sleeping Mask',
      api_featured_image: 'www.lookfantastic/laneige/sleepingmask.com',
      price: 8,
      price_sign: '$',
    });
    // when
    const response = await request(app).get('/api/search/lip');
    // then
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('NARS Afterglow Lip Balm');
    expect(response.body[1].name).toBe('LANEIGE Lip Sleeping Mask');
  });

  it('should return status 404 if no products match the search query', async () => {
    // given
    await Product.create({
      name: 'NARS Afterglow Lip Balm',
      api_featured_image: 'www.lookfantastic/nars/afterglow.com',
      price: 7,
      price_sign: '$',
    });
    // when
    const response = await request(app).get('/api/search/mask');
    // then
    expect(response.status).toBe(404);
    expect(response.body).toBe('No products found.');
  });

  it('should return status 400 if search query is less than 3 characters', async () => {
    // when
    const response = await request(app).get('/api/search/li');
    // then
    expect(response.status).toBe(400);
    expect(response.body).toBe('Minimum 3 characters must be provided.');
  });
});
