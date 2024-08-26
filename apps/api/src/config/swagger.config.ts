import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CN-Billing API')
  .setDescription('Backend for CN-Billing')
  .setVersion(`1.0.0 - ${process.env.NODE_ENV}`)
  .addBearerAuth(undefined, 'access-token')
  .addBearerAuth(undefined, 'refresh-token')
  .setExternalDoc('Postman Collection', '/docs-json')
  .build();

