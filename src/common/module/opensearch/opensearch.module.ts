import { Module } from '@nestjs/common';

import { opensearchClientFactory } from './opensearch.client.factory';
import { OpenSearchService } from './opensearch.service';

@Module({
    imports: [],
    controllers: [],
    providers: [opensearchClientFactory, OpenSearchService],

    exports: [OpenSearchService],
})
export class OpenSearchModule { }