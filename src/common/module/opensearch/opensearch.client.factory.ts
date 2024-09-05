import { FactoryProvider } from '@nestjs/common';
import { Client } from "@opensearch-project/opensearch";

export const opensearchClientFactory: FactoryProvider<Client> = {
    provide: 'OpensearchClient',
    useFactory: async () => {
        const opensearchInstance = new Client({
            node: process.env.OPENSEARCH_URL,
            ssl: { rejectUnauthorized: false },
        });

        opensearchInstance.ping().then(() => {
            console.log('Opensearch Connection Success');
        }).catch((err: string) => {
            console.log('Opensearch Connection Failed');
            console.log(err);
        });
        return opensearchInstance;
    },
    inject: [],
};