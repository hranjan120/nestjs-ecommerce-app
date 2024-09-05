import { Inject, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

interface Message {
    msgTimeStamp?: number;
    name: string;
    email: string;
    isActive: boolean;
    role?: string;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    constructor(@Inject('KafkaClient') private readonly kafkaClient: Kafka) { }

    onModuleInit() {
        this.consumeMessages();
    }

    onModuleDestroy(): void {
        // this.kafkaClient.close();
    }

    async consumeMessages(): Promise<void> {
        console.log('Kafka Consumer Started');
        const consumer = this.kafkaClient.consumer({ groupId: 'kafka-producer-app-gp' });
        await consumer.connect();
        await consumer.subscribe({ topics: ['SAMPLE-TOPIC'], fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                console.log('----Inside Kafka consumer----');
                const payloadData = JSON.parse(message.value.toString());
                console.log(payloadData);
            },
        });
    }

    async sendMessage(topicName: string, input: Message): Promise<boolean> {
        input.msgTimeStamp = Math.floor(Date.now() / 1000);
        const kafkaProducr = this.kafkaClient.producer({
            allowAutoTopicCreation: true,
            transactionTimeout: 30000,
        });
        kafkaProducr.on('producer.connect', () => {
            console.log('KafkaProvider: connected');
        });
        await kafkaProducr.connect();
        await kafkaProducr.send({
            topic: topicName,
            messages: [{
                value: JSON.stringify(input),
            }],
        });
        return true;
    }

    async createTopic(topicName: string): Promise<boolean> {
        const admin = this.kafkaClient.admin();
        await admin.createTopics({
            topics: [{ topic: topicName, numPartitions: 3, replicationFactor: 3 }],
        });
        return true;
    }

    async listTopic(): Promise<string[]> {
        const admin = this.kafkaClient.admin();
        const topicList = await admin.listTopics();
        return topicList;
    }
}