import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.headers.userDecodedName = 'dummy user';
    req.headers.userDecodedId = '123';
    console.log('Logger middleware Request...');
    next();
  }
}
