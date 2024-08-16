import { IsString, IsDate, IsEmail, Length, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nombre: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // Transforma el valor a un objeto Date
    fechaNacieminto: Date;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 14)
    contraseña: string;
}