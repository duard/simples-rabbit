import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Message } from './message.event';
const ms = 200;

@Injectable()
export class AppService {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }
  public async send(pattern: string, data: any) {
    try {
      const result$ = this.client.send(pattern, data);
      return await lastValueFrom(result$);
    } catch (error) {
      console.log('That did not go well.');
      throw error;
    }
  }
}
