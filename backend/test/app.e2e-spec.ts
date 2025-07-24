import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

jest.setTimeout(30000);
const env = dotenv.config({ path: '.env.test', override: true }); 
dotenvExpand.expand(env);


describe('Auth API (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  // In production we should use a test DB or in memory mongo server to not affect the real data 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = moduleFixture.get<Connection>(getConnectionToken());
  });

  afterAll(async () => {
    if (connection.readyState !== 1) {
      console.warn('⚠️ MongoDB is not connected. Skipping dropDatabase.');
    } else {
      await connection.dropDatabase();
    }
  
    await app.close();
  });
  
  it('/auth/signup (POST) - should create user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'e2e@test.com',
        name: 'e2e user',
        password: 'E2e@1234',
      });

    expect(res.status).toBe(201);
  });

  it('/auth/signin (POST) - should return JWT token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'e2e@test.com',
        password: 'E2e@1234',
      });

    expect(res.status).toBe(201);
    expect(res.body.access_token).toBeDefined();
  });

  it('/user/me (GET) - should return current user with token', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'e2e@test.com',
        password: 'E2e@1234',
      });

    const token = login.body.access_token;

    const res = await request(app.getHttpServer())
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('e2e@test.com');
  });
});
