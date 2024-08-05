import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-users.dto';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { Users } from './schemas/users.schema';

/*
*---------------------
*/
@Injectable()
export class UserService {

    constructor(@InjectModel(Users.name) private userModel: Model<Users>) { }


    getHello() {
        return 'Hello by User Module';
    }

    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const newUser = await new this.userModel(createUserDto);
        return newUser.save();
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<Users> {
        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }

    async getAllUsers(): Promise<Users[]> {
        const userData = await this.userModel.find().select({ __v: 0, updatedAt: 0 });
        return userData;
    }

    async getUser(userId: string): Promise<Users> {
        const existingUser = await this.userModel.findById(userId);
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }

    async deleteUser(userId: string): Promise<Users> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return deletedUser;
    }
}