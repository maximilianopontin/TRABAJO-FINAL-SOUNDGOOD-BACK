import { IsString, Length, IsNotEmpty, Min, Max, IsInt, IsNumber, IsNumberString, IsArray } from "class-validator";

export class CreateCancionesDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 45)
  titulo: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900) // Año mínimo permitido
  @Max(new Date().getFullYear()) // Año máximo es el año actual
  anioLanzamiento: number;

  @IsNotEmpty()
  @IsInt()
  duracion: number;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsNumber()
  generoId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  artistaId: number[];


}
