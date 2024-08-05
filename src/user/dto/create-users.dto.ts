import { IsNotEmpty, IsString, MaxLength, IsEmail, IsNumber, IsEnum, Matches } from "class-validator";
import { UserStatus } from "../schemas/user-enums";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @Matches(/^\d{10}$/)
    readonly mobile: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly address: string;

    @IsEnum(UserStatus)
    @IsNotEmpty()
    readonly status: string;
}