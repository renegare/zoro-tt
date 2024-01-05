import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Knex } from 'knex';
import { getConnectionToken } from 'nest-knexjs';
import * as request from 'supertest';
import { v4 as createId } from 'uuid';
import { AppModule } from './../src/app.module';
import { generateUser } from './generateUser';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let db: Knex;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
      .expect('Hello World!')
      .on('error', console.error);
  });

  it('/auth (POST)', async () => {
    const password = createId();
    const user = await generateUser({}, password);
    await db.table('users').insert(user);

    let response = await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: user.username,
        password,
      })
      .expect(201);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });

    const accessToken = response.body.accessToken;

    response = await request(app.getHttpServer())
      .get('/whoami')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        sub: user.id,
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }),
    );
  });

  it('/auth (POST) fail incorrect creds', async () => {
    const user = await generateUser();
    await db.table('users').insert(user);

    await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: user.username,
        password: 'incorrect',
      })
      .expect(401);
  });

  it('/auth (POST) fail deleted user', async () => {
    const password = 'password';
    const user = await generateUser({ deletedAt: new Date() }, password);
    await db.table('users').insert(user);

    await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: user.username,
        password,
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
});
