import { Module } from '@nestjs/common';
import { TisMicroserviceController } from './tis.controller';
import { NatsModule } from '@app/common';

@Module({
    imports: [NatsModule],
    controllers: [TisMicroserviceController],
    providers: [],
})
export class TisModule {}