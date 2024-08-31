import { IsString, IsNumberString, Length, IsNotEmpty, Min, Max, IsInt, IsNumber, isNumberString } from "class-validator";

export class CreateArtistaDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nombre: string;

  
}
