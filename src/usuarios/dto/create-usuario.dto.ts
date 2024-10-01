import { IsString, IsDate, IsEmail, Length, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    nombre: string;

    @IsString()
    @Length(1, 64)
    userName: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // Transforma el valor a un objeto Date
    fechaNacimiento: Date;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    //permite configurar la validacion de la contraseña y agregar un msj en caso de no cumplir los requisitos de la contraseña
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          {
            message:
              'Password must contain a minimum of 8 characters and at least 1 lower case, 1 upper case, 1 number and 1 special character',
          },
        )
    contraseña: string;
}