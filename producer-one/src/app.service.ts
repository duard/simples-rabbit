import { Injectable } from '@nestjs/common';
const ms = 200;
@Injectable()
export class AppService {
  // @EventPattern('message_printed')
  // async handleMessagePrinted(data: Record<string, unknown>) {
  //   console.log(`=> RABBIT : `, data.text);
  // }

  resolvePromisse(data: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`done processing ${JSON.stringify(data)} ${new Date()}`);
        resolve('Resolved in ' + ms + 'ms.');
      }, 12200);
    });
  }

  rejectPromisse(data: any) {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(`Request timed out after + ${ms} ms.`);
      }, ms);
    });
  }

  generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }
}
