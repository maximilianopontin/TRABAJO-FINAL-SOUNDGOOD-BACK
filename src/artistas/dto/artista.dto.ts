import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from "class-validator";

export class ArtistaDto {
    @ApiProperty({
        description: 'Nombre del artista',
        example: 'Ed Sheeran',
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nombre: string;

}
