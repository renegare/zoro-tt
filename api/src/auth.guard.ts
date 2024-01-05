import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const getToken = (req: Request) => {
  const [type, token]: string[] =
    (req.headers['authorization'] || '').replace(/\s+/gi, ' ').split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = getToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
