import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
}
