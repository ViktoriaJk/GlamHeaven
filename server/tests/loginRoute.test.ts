import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
const secretKey = process.env.JWT_SECRET as string;
jest.mock('../api/google');
import { getIdToken } from '../api/google';

console.log(process.env.MONGO_URI);

describe('POST /api/login', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await User.deleteMany();
    // await mongoose.connection.db.dropDatabase();
    //jest.clearAllMocks();
  });

  it('should return status 200 and save user to database', async () => {
    // given
    const code = '1a2s3d4f5g6h7j8k9l';
    const token = jwt.sign(
      { sub: '1234', name: 'User', email: 'user@test.com' },
      secretKey
    );
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(Promise.resolve(token));
    // when
    const response = await request(app).post('/api/login').send({ code });
    // then
    const dbContent = await User.find();
    expect(dbContent).toHaveLength(1);
    expect(dbContent[0]).toHaveProperty('_id');
    expect(dbContent[0].email).toBe('user@test.com');
    expect(response.status).toBe(200);
  });

  it('should return status 400 when code is not sent', async () => {
    // given
    const code = '1a2s3d4f5g6h7j8k9l';
    // when
    const response = await request(app).post('/api/login');
    // then
    const dbContent = await User.find();
    expect(dbContent).toHaveLength(0);
    expect(response.status).toBe(400);
  });
});
