import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
})
export class NatsModule {}

// #TODO CLEAR
// create a NATS module to be shared with all microservices
// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { NatsOptions, NatsOptionsFactory, NatsModule } from '@app/common';
// import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';

// @Module({
//   imports: [
//     NatsModule.registerAsync({
//       useFactory: (configService: ConfigService) => ({
//         url: configService.get<string>('NATS_URL'),
//         user: configService.get<string>('NATS_USER'),
//         pass: configService.get<string>('NATS_PASS'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class NatsModule {}
