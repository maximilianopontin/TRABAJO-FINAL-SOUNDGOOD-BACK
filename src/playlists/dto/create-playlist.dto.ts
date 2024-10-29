import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

    @ApiProperty()
    @IsArray()
    @IsNumber({}, { each: true })
    cancionId: number[];

}


