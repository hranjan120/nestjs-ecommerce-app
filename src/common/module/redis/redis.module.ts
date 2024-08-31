import { Module } from '@nestjs/common';

import { redisClientFactory } from './redis.client.factory';
import { RedisService } from './redis.service';

@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisService],

    exports: [RedisService],
})
export class RedisModule { }