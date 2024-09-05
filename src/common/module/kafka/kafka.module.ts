import { Module } from '@nestjs/common';

import { kafkaClientFactory } from './kafka.client.factory';
import { KafkaService } from './kafka.service';

@Module({
    imports: [],
    controllers: [],
    providers: [kafkaClientFactory, KafkaService],

    exports: [KafkaService],
})
export class KafkaModule { }