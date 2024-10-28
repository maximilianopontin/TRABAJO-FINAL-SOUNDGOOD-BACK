import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty, } from "class-validator";

export class CreateArtistaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nombre: string;  
}
