import { IsNotEmpty, isString, MinLength } from "class-validator";


export class CreateProjectDto {
    @IsNotEmpty()
    name: string;
    
}