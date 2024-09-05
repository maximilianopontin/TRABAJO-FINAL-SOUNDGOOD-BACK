import { IsString, Length, IsNotEmpty, } from "class-validator";

export class CreateArtistaDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nombre: string;  
}
