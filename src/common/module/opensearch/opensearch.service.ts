import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from "@opensearch-project/opensearch";

@Injectable()
export class OpenSearchService implements OnModuleDestroy {
    constructor(@Inject('OpensearchClient') private readonly opensearchClient: Client) { }

    onModuleDestroy(): void {
        this.opensearchClient.close();
    }

    async addSingleData(input: string): Promise<string | null> {
        return null;
    }

    async getData(input: string): Promise<string | null> {
        return null;
    }

    async createIndex(indexName: string): Promise<number> {
        const indexResponse = await this.opensearchClient.indices.create({
            index: indexName,
            // body: {
            //     mappings: {
            //         properties: {
            //             userId: { type: 'long' },
            //             nid: { type: 'long' },
            //             "@timestamp": { type: 'date' },
            //         }
            //     }
            // },
        });
        return indexResponse.statusCode;
    }
}