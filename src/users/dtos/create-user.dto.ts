import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    
    @ApiProperty()
    @IsEmail()
    email?: string;
}