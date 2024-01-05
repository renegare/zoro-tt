import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async signIn(username: string, password: string) {
    if (username !== 'username' || password !== 'password') {
      throw new UnauthorizedException();
    }

    return { token: 'XXX' };
  }
}
