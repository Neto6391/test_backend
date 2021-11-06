import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { LevelAccess } from "./level-access.dto";


export class CreateGuestUserProject {
    
    @IsNotEmpty()
    @IsNumber()
    projectId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsEnum(LevelAccess)
    levelAccess: LevelAccess

}