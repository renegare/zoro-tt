import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/auth')
  async authenticate(@Body() credentials: Record<string, any>) {
    return await this.appService.signIn(
      credentials.username,
      credentials.password,
    );
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoami(@Request() request) {
    return request.user;
  }
}
