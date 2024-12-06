import { IsString, IsDate, IsEmail, Length, IsNotEmpty, IsStrongPassword, IsOptional, IsNumber } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
  
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  usuarioId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  nombre: string;

  @ApiProperty()
  @IsString()
  @Length(1, 64)
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Transforma el valor a un objeto Date
  fechaNacimiento: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
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