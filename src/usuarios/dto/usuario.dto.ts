import { IsString, IsDate, IsEmail, Length, IsNotEmpty, IsStrongPassword, IsOptional, IsNumber } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  usuarioId: number;

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
}