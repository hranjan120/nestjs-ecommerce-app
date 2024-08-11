
import { Request, Response } from "express";

/*-------------*/
interface UserJwt {
    sub: string;
    name: string;
    iat: number;
    id: number;
}

export interface EcomAppRequest extends Request {
    decodedUser: UserJwt
}

export interface EcomAppResponse extends Response { }