import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateFavoritoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
    
    @ApiProperty()
    @IsArray()
    @IsNumber({}, { each: true })
    cancionId: number;
    
}
