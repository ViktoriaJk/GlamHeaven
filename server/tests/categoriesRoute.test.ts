import request from 'supertest';
import app from '../app';
import { Category } from '../models/Category';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('GET /api/categories', () => {
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
    await Category.deleteMany();
    // await mongoose.connection.db.dropDatabase();
    //jest.clearAllMocks();
  });

  it('should return status 200 and all categories', async () => {
    // given
    await Category.create([
      { name: 'Highlighter', rawName: 'Highlighter', ufUrl: 'highlighter' },
      { name: 'Concealer', rawName: 'Concealer', ufUrl: 'concealer' },
    ]);
    // when
    const response = await request(app).get('/api/categories');
    // then
    const dbContent = await Category.find({});
    expect(dbContent).toHaveLength(2);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
