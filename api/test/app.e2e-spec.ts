import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: 'username',
        password: 'password',
      })
      .expect(201);

    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('/auth (POST) fail', async () => {
    await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: 'incorrect',
        password: 'incorrect',
      })
      .expect(401);
  });

  fit('/whoami (GET) fail', async () => {
    await request(app.getHttpServer()).get('/whoami').expect(403);
  });

  it.todo('/whoami (GET) success');
});
