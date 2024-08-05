import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {

    getHello() {
        return 'Hello by index Module';
    }
}
