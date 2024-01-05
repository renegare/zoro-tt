import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { v4 as createId } from 'uuid';
import { Knex } from 'knex';
import { getConnectionToken } from 'nest-knexjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let db: Knex;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwt = app.get(JwtService);
    db = app.get<Knex>(getConnectionToken());

    await app.init();
  });

  beforeEach(async () => {
    await db.table('users').truncate();
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

  it('/whoami (GET) fail with no token', async () => {
    await request(app.getHttpServer()).get('/whoami').expect(401);
  });

  it('/whoami (GET) fail with fake token', async () => {
    await request(app.getHttpServer())
      .get('/whoami')
      .set({ Authorization: `Bearer fake` })
      .expect(401);
  });

  it('/whoami (GET) success', async () => {
    const id = createId();
    const accessToken = await jwt.signAsync({ sub: id, username: 'username' });

    const response = await request(app.getHttpServer())
      .get('/whoami')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        sub: id,
        username: 'username',
      }),
    );
  });
});
