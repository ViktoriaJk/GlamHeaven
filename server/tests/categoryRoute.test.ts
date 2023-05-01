import request from 'supertest';
import app from '../app';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('GET /api/category/:url', () => {
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
    await Category.deleteMany();
    // await mongoose.connection.db.dropDatabase();
    //jest.clearAllMocks();
  });

  it('should return status 200 and all products of a given category', async () => {
    // given
    await Category.create({
      name: 'Lip Balm',
      rawName: 'lip_balm',
      ufUrl: 'lip-balm',
    });
    await Product.create([
      {
        name: 'NARS Afterglow Lip Balm',
        api_featured_image: 'www.lookfantastic/nars/afterglow.com',
        price: 7,
        price_sign: '$',
      },

      {
        name: 'LANEIGE Lip Sleeping Mask',
        api_featured_image: 'www.lookfantastic/laneige/sleepingmask.com',
        price: 8,
        price_sign: '$',
      },
    ]);
    // when
    const response = await request(app).get('/api/category/:ufUrl');
    // then
    const dbContent = await Product.find({});
    expect(dbContent).toHaveLength(2);
    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
  });
});
