import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from "class-validator";
 // DTO para poder traer los datos tanto en top como en tendencias, conectado con el DTO de canciones
export class GeneroDto {
    @ApiProperty({
        description: 'Nombre del género musical',
        example: 'Pop',
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    genero: string;
 }
