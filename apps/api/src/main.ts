import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const host = config.get('API_HOST') || 'localhost';
  const port = config.get('API_PORT') || 3000;
  const swaggerPath = config.get('API_SWAGGER_PATH') || 'api-docs';
  const isSwaggerEnabled = config.get('API_SWAGGER_ENABLED') || false;
  const node_env = config.get('NODE_ENV') || 'development';

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  if (isSwaggerEnabled) {
    Logger.log(`Swagger is running on ${host}:${port}/${swaggerPath}`);
    SwaggerModule.setup(swaggerPath, app, document);
  }

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  console.log(`Host: ${host}`);
  console.log(`Port: ${port}`);
  console.log(`Global prefix: ${globalPrefix}`);
  await app.listen(port, host);
  Logger.log(
    `🚀 Application is running on: ${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
