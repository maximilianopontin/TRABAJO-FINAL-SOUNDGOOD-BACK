import { IsString, Length, IsNotEmpty, Min, Max, IsInt, IsNumber, IsNumberString, IsArray } from "class-validator";

export class CreateCancionesDto {
  @IsNotEmpty()
  @IsNumberString()  
  @Length(3, 45)
  titulo: string;

  @IsNotEmpty()
  @IsInt()
  @IsNumberString()
  @Min(1900) // Año mínimo permitido
  @Max(new Date().getFullYear()) // Año máximo es el año actual
  anioLanzamiento: number;

  @IsNotEmpty()
  @IsInt()
  @IsNumberString()
  duracion: number;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsNumberString()
  generoId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumberString({}, { each: true })
  artistaId: number[];


}
