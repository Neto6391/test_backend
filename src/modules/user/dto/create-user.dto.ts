import { IsNotEmpty, isString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    @MinLength(6)
    senha: string;
}