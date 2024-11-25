import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsString, Length, IsNotEmpty, IsArray, IsOptional, IsNumber} from "class-validator";
import { ArtistaDto } from "src/artistas/dto/artista.dto";
import { GeneroDto } from "src/generos/dto/genero.dto";

export class CancionesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Expose()
    cancionId:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 45)
    titulo?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    songFilename?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    imageFilename?: string;

    @ApiProperty({
        description: 'Género de la canción (nombre y detalles)',
        type: () => GeneroDto
    })
    @IsNotEmpty()
    @Type(() => GeneroDto)
    genero?: GeneroDto;

    @ApiProperty({
        description: 'Lista de artistas de la canción',
        type: [ArtistaDto]
    })
    @IsNotEmpty()
    @IsArray()
    @Type(() => ArtistaDto)
    artistas?: ArtistaDto[];
}
