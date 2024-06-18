import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KeyManageServiceModule } from './key-manage-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    KeyManageServiceModule,
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
