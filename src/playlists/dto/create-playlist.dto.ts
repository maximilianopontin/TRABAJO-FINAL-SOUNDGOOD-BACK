import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {

    @IsNotEmpty()
    @IsString()
    title: string;


    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    cancionId: number[];

}


