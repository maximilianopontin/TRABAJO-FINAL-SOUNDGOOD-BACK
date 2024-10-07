import { Transform, Type } from "class-transformer";
import { IsString, Length, IsNotEmpty, Min, Max, IsInt, IsNumber, IsArray, IsOptional, ArrayNotEmpty } from "class-validator";

export class CreateCancionesDto {

  @IsNotEmpty()
  @IsString() 
  @Length(3, 45)
  titulo?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900) // Año mínimo permitido
  @Max(new Date().getFullYear()) // Año máximo es el año actual
  @Type(() => Number)
  anioLanzamiento?: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  duracion?: number;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  generoId?: number;

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