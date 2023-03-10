import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

import { Message } from './message.event';
import { ClientProxy } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello() {
    const pendingOperations = Array.from(new Array(5)).map((_, index) =>
      this.appService.send('email-subscribers', {
        message: this.appService.getHello() + index,
      }),
    );
    const result = await Promise.all(pendingOperations);
    console.log(`RESULT =>`, result);
    return result;
  }
}
