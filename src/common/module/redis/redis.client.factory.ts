import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
    provide: 'RedisClient',
    useFactory: async () => {
        const redisConfigOption = {
            host: process.env.REDIS_URL,
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PWD,
            maxRetriesPerRequest: null,
            tls: {},
            retryStrategy(times: number) {
                if (times % 4 === 0) {
                    console.log('redisRetryError', 'Redis reconnect exhausted after 3 retries.');
                    return null;
                }
                return 200;
            },
        };
        const redisInstance = process.env.NODE_ENV === 'development'
            ? new Redis(process.env.REDIS_URL)
            : new Redis(redisConfigOption);

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