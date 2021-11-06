import { IsNotEmpty } from "class-validator";


export class CreateDocumentDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}