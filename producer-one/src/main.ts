import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('API_PORT') || 3333;
  const name = configService.get('API_NAME') || 'NO-NAME';
  const user = configService.get('RABBITMQ_USER');
  const password = configService.get('RABBITMQ_PASSWORD');
  const host = configService.get('RABBITMQ_HOST');
  const queueName = configService.get('RABBITMQ_QUEUE_NAME');

  console.log(`amqp://${user}:${password}@${host}`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      // host: '0.0.0.0',
      // port: port,
      // false = manual acknowledgement; true = automatic acknowledgment
      // noAck: false,
      // Get one by one
      // prefetchCount: 0,
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  // await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 running on: http://localhost:${port}/`, `${name}`);
}
bootstrap();
