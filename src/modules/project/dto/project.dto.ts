import { IsNotEmpty } from "class-validator";


export class ProjectDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    userId: number;
}   