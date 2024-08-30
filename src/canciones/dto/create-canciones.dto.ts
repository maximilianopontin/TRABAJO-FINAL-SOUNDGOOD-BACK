import { IsString, IsDate, Length, IsNotEmpty, IsPositive, IsInt, IsNumber } from "class-validator";
import { Type } from 'class-transformer';

export class CreateCancionesDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 45)
    titulo: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // Transforma el valor a un objeto Date
    añoLanzamiento: Date;

    @IsNotEmpty()
    @IsInt()
    duracion: number;

    @IsNotEmpty()
    @IsString()
    filename: string;

   // @IsNotEmpty()
   // @IsNumber()
     //generoId: number;

  //  @IsNotEmpty()
   // @IsNumber()
    //artistaId: number;


}
