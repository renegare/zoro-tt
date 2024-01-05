import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

type Nullable<T> = T | null;

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
};

export const hashPassword = async (password: string, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return [hash, salt];
};

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly db: Knex,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signIn(username: string, password: string) {
    // find user
    const user = await this.db
      .table<User, User>('users')
      .where({
        username,
        deletedAt: null,
      })
      .first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      ...user,
    });

    return { accessToken };
  }
}
