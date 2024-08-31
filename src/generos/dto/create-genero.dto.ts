import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateGeneroDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    genero: string;
}
