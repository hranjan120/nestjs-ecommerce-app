import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {

    getHello() {
        return 'Hello by order Module ..';
    }
}
