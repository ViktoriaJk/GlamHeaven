import request from 'supertest';
import app from '../app';
import { Category } from '../models/Category';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('GET /api/categories', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(`${process.env.MONGO_URI}`);
    //await mongoose.connect(mongoServer.getUri(), {});
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
    await Category.create([{ name: 'Highlighter' }, { name: 'Concealer' }]);
    // when
    const response = await request(app).get('/api/categories');
    // then
    const dbContent = await Category.find();
    expect(dbContent).toHaveLength(2);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
