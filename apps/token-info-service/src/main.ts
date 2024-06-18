import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TokenInfoServiceModule } from './token-info-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TokenInfoServiceModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats:4222'],
      },
    }
  );
  await app.listen();

}
bootstrap();
