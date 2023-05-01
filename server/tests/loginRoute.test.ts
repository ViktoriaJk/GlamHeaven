import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { getIdToken } from '../api/google';

jest.mock('../api/google');

const secretKey = process.env.JWT_SECRET as string;

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

  it('should return status 200 and save user into the database', async () => {
    // given
    const code = 'hfzbgf73tdcfgfu9';
    const token = jwt.sign(
      {
        sub: '12345678910',
        name: 'TestUser',
        email: 'testuser@gmail.com',
        given_name: 'username',
        picture: 'http',
      },
      secretKey
    );

    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(Promise.resolve(token));
    // when
    const response = await request(app).post('/api/login').send({ code });
    // then
    const dbContent = await User.find({});
    expect(response.status).toBe(200);
    expect(dbContent).toHaveLength(1);
    expect(dbContent[0].email).toBe('testuser@gmail.com');
    expect(dbContent[0]).toHaveProperty('_id');
  });

  it('should return status 400 when code is not sent', async () => {
    // given
    const code = 'hfzbgf73tdcfgfu9';
    // when
    const response = await request(app).post('/api/login');
    // then
    const dbContent = await User.find({});
    expect(dbContent).toHaveLength(0);
    expect(response.status).toBe(400);
  });
});
