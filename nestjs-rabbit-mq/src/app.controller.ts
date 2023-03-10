import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(`RECEIVED MESSAGE: `, data.text);
  }

  @MessagePattern('email-subscribers')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();

    const whatPromisse = this.appService.generateRandomInteger(1, 2);
    console.log(whatPromisse, 'data', data);

    // if (whatPromisse === 1) return await this.appService.rejectPromisse(data);

    return await this.appService.resolvePromisse(data);
    // channel.ack(orginalMessage);
  }
}
