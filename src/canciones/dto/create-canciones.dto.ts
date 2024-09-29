import { IsString, Length, IsNotEmpty, IsNumberString, IsArray, IsOptional } from 'class-validator';

export class CreateCancionesDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 45)
  titulo: string;

  @IsNotEmpty()
  @IsNumberString()
  anioLanzamiento: number;

  @IsNotEmpty()
  @IsNumberString()
  duracion: number;

  @IsOptional() // El archivo será opcional en el DTO inicialmente
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsNumberString()
  generoId: number;

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  artistaId: number[];
}
