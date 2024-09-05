import { Body, Controller, Delete, Get, Patch, Post, Res, HttpStatus, Param, UseGuards, Req } from '@nestjs/common';
import { EcomAppRequest, EcomAppResponse } from '../common/utility/reqRes.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { AuthGuard } from '../common/auth/auth.guard';
import { RolesGuard } from '../common/auth/role.guard';
import { RedisService } from '../common/module/redis/redis.service';
import { OpenSearchService } from '../common/module/opensearch/opensearch.service';

/*-------------*/
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly redisService: RedisService,
        private readonly openSearchService: OpenSearchService
    ) { }

    /*-------------*/
    @Get()
    async sayHello() {
        return this.userService.getHello();
    }

    /*-------------*/
    @Post('add-new')
    async addNewUser(@Res() res: EcomAppResponse, @Body() createUserDto: CreateUserDto) {
        try {
            const addedData = await this.userService.createUser(createUserDto);
            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'User has been created successfully', addedData });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: User not created!', error: 'Bad Request'
            });
        }
    }

    /*-------------*/
    @Patch('update-single/:id')
    async updateSingleUser(@Res() res: EcomAppResponse, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            await this.userService.updateUser(userId, updateUserDto);
            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'User has been updated successfully' });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: User not updated!', error: 'Bad Request'
            });
        }
    }

    /*-------------*/
    @UseGuards(AuthGuard, new RolesGuard('USER', 'CREATE'))
    @Get('fetch-all')
    async fetchAllUser(@Req() req: EcomAppRequest, @Res() res: EcomAppResponse) {
        try {
            console.log(req.decodedUser);
            const allUsers = await this.userService.getAllUsers();
            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'User data', allUsers });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: User not created!', error: 'Bad Request'
            });
        }
    }

    /*-------------*/
    @Get('fetch-single/:id')
    async fetchSingleUser(@Res() res: EcomAppResponse, @Param('id') userId: string) {
        try {
            const userData = await this.userService.getUser(userId);
            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'Single User detail', userData });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: User not created!', error: 'Bad Request'
            });
        }
    }

    /*-------------*/
    @Delete('delete/:id')
    async removeUser(@Res() res: EcomAppResponse, @Param('id') userId: string) {
        try {
            await this.userService.deleteUser(userId);
            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'User has been deleted successfully' });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: User not created!', error: 'Bad Request'
            });
        }
    }

    /*-------------*/
    @Get('chk-redish')
    async checkRedis(@Res() res: EcomAppResponse) {
        try {
            await this.redisService.set('userdata', 'username', 'Test User');
            const userData = await this.redisService.get('userdata', 'username');

            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'Redis Working', userData });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: Redis not working!', error: 'Bad Request'
            });
        }
    }

    /*-------------*/
    @Get('chk-opensearch')
    async checkOpensearch(@Res() res: EcomAppResponse) {
        try {
            const opensearchRes = await this.openSearchService.createIndex('testing_index_1');

            return res.status(HttpStatus.OK).json({ success: true, statusCode: HttpStatus.OK, message: 'Opensearch Working', opensearchRes });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error: Index not created!', error: 'Bad Request'
            });
        }
    }
}
