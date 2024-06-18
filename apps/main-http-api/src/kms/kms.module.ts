import { Module } from '@nestjs/common';
import { KmsMicroserviceController } from './kms.controller';
import { NatsModule } from '@app/common';

@Module({
    imports: [NatsModule],
    controllers: [KmsMicroserviceController],
    providers: [],
})
export class KmsModule {}