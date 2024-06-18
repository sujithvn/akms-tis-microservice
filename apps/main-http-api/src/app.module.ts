import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NatsModule } from '@app/common';
import { KmsModule } from './kms/kms.module';
import { TisModule } from './tis/tis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        // PG_SERVER: Joi.string().required(),
      }),
      envFilePath: './apps/main-http-api/.env',
    }),
    NatsModule,
    TisModule,
    KmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
