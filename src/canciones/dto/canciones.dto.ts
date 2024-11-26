import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsString, Length, IsNotEmpty, IsArray, IsOptional, IsNumber, IsBoolean } from "class-validator";
import { ArtistaDto } from "src/artistas/dto/artista.dto";
import { GeneroDto } from "src/generos/dto/genero.dto";
import { UsuarioDto } from "src/usuarios/dto/usuario.dto";

export class CancionesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Expose()
    cancionId: number;

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

    @ApiProperty({
        description: 'Lista de usuarios relacionados con la canción',
        type: [UsuarioDto] // Representa una relación ManyToMany con usuarios
    })
    @IsOptional() // Puede ser opcional según la lógica de tu aplicación
    @IsArray()
    @Type(() => UsuarioDto)
    usuarios?: UsuarioDto[]; // O utiliza los IDs: number[]

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    @Expose()
    reproducciones?: number;

    @ApiProperty()
    @IsBoolean()
    @Expose()
    top10?: boolean;

    @ApiProperty()
    @IsBoolean()
    @Expose()
    tendencias?: boolean;
}
