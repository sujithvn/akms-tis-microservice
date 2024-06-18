import { Module } from '@nestjs/common';
import { TokenInfoServiceController } from './token-info-service.controller';
import { TokenInfoServiceService } from './token-info-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenInfoService, TokenInfoServiceSchema } from './schema/tis.schema';
import { TokenInfoServiceRepository } from './token-info-service.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password@tis_mongo_db:27017/token_info_service?retryWrites=true&writeConcern=majority&authSource=admin'),
    MongooseModule.forFeature([
      {
        name: TokenInfoService.name,
        schema: TokenInfoServiceSchema,
      },
    ]),
  ],
  controllers: [TokenInfoServiceController],
  providers: [TokenInfoServiceService, TokenInfoServiceRepository],
})
export class TokenInfoServiceModule {}
