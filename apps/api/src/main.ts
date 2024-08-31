import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // Use fastify instead of express
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = app.get(ConfigService);

  const host = config.get('API_HOST') || 'localhost';
  const port = config.get('API_PORT') || 3000;
  const swaggerPath = config.get('API_SWAGGER_PATH') || 'api-docs';
  const isSwaggerEnabled = config.get('API_SWAGGER_ENABLED') || false;
  const node_env = config.get('NODE_ENV') || 'development';

  // Auto validation at the application level
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  if (isSwaggerEnabled) {
    Logger.log(`Swagger is running on ${host}:${port}/${swaggerPath}`);
    SwaggerModule.setup(swaggerPath, app, document);
  }

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
