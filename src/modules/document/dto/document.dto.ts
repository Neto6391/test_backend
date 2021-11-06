import { IsNotEmpty } from "class-validator";


export class DocumentDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    projectId: number;
}