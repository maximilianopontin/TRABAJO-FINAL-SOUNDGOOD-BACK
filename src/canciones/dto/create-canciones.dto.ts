import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsString, Length, IsNotEmpty, Min, Max, IsInt, IsNumber, IsArray, IsOptional, ArrayNotEmpty } from "class-validator";

export class CreateCancionesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString() 
  @Length(3, 45)
  titulo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1900) // Año mínimo permitido
  @Max(new Date().getFullYear()) // Año máximo es el año actual
  @Type(() => Number)
  anioLanzamiento?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  duracion?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  filename?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  generoId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((id) => parseInt(id.trim(), 10));
    }
    return value;
  }) // transforma el array en un string 
  artistaId?: number[];
}