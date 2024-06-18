import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    }),
  );  

  const optionsForSwagger = new DocumentBuilder()
  .setTitle('Key Management & Token Info Service')
  .setDescription('API for Access key management and Token Info Service')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://staging.yourapi.com/', 'Staging')
  .addServer('https://production.yourapi.com/', 'Production')
  .addTag('Key Management & Token Info Service')
  .build();
  const document = SwaggerModule.createDocument(app, optionsForSwagger);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT || 3000, () => {
    console.log(`Main API is running on PORT :${PORT}`);
  });
}
bootstrap();
