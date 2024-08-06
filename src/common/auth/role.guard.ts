import { Injectable, CanActivate, ForbiddenException } from '@nestjs/common';
import { ALL_ROLES } from './allRolesSubroles';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private mainRole: string, private subRole: string) { }

    async canActivate(): Promise<boolean> {
        console.log('<--- Inside the role Guard ---<');
        //Match Roles data from Jwt Token or any other source like Redis or Database
        const mainRoleChk = ALL_ROLES[this.mainRole];
        if (!mainRoleChk) {
            throw new ForbiddenException('Main Role is not Valid..');
        }

        if (!mainRoleChk.includes(this.subRole)) {
            throw new ForbiddenException('Sub Role is not Valid..');
        }
        return true;
    }
}