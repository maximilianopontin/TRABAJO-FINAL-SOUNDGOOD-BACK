import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CancionesDto } from "src/canciones/dto/canciones.dto";
 
export class PlaylistDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playlistId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class PlaylistCancionesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playlistId: number;

    @ApiProperty()
    @IsArray()
    @IsNumber({}, { each: true })
    @Type(() => CancionesDto)
    canciones: CancionesDto[];
}