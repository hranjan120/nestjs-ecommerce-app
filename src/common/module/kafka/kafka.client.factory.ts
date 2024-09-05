import { FactoryProvider } from '@nestjs/common';
import { Kafka } from 'kafkajs';

export const kafkaClientFactory: FactoryProvider<Kafka> = {
    provide: 'KafkaClient',
    useFactory: async () => {
        const kafkaInstance = new Kafka({
            clientId: 'node-kafka-client-id',
            brokers: process.env.KAFKA_URL.split(','),
        });
        return kafkaInstance;
    },
    inject: [],
};