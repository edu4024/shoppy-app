import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initFirebaseApp } from './config/firebase.config';
import { LoggerFactory } from './utils/LoggerFactory';

initFirebaseApp();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    logger: LoggerFactory('Shopy-server'),
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors({ credentials: true, origin: true });
  const config = new DocumentBuilder()
    .setTitle('Shopy app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(port);
}
bootstrap();
