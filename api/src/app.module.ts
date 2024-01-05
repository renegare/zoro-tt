import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),

    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: 'password',
          database: 'postgres',
          port: Number(5432),
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
