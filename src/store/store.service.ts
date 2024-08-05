import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {

    getHello() {
        return 'Hello by Store Module';
    }
}
