import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get('API_PORT') || 3333;
  const name = configService.get('API_NAME') || 'NO-NAME';

  await app.listen(port);

  Logger.log(
    `🚀 running on: http://localhost:${port}/${globalPrefix}`,
    `${name}`,
  );
}
bootstrap();
