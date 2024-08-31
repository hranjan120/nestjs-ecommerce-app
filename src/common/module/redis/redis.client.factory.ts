import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
    provide: 'RedisClient',
    useFactory: async () => {
        const redisInstance = new Redis({
            host: 'localhost',
            port: 6379,
        });

        redisInstance.on("ready", () => {
            console.log("Redis connection established successfully.")
        })
        redisInstance.on('error', e => {
            throw new Error(`Redis connection failed: ${e}`);
        });

        return redisInstance;
    },
    inject: [],
};