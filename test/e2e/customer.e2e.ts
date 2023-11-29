import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get access token
    const response = await request(app.getHttpServer())
      .post('/user/login')
      .send({ username: 'user1', password: 'password1' });
    accessToken = response.body.accessToken.token;
  });

  it('/customer/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/customer/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+34666111222',
        address: 'Example street, 1',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expect.any(Object));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
