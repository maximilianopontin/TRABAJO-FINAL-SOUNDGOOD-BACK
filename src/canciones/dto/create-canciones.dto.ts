import { IsString, Length, IsNotEmpty, Min, Max, IsInt, IsNumber, IsNumberString } from "class-validator";

export class CreateCancionesDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 45)
  titulo: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900) // Año mínimo permitido
  @Max(new Date().getFullYear()) // Año máximo es el año actual
  añoLanzamiento: number;

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
  @IsNumberString()
  artistaId: number[];


}
