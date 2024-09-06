import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateFavoritoDto {
    @IsNotEmpty()
    @IsNumber()
    usuarioId : number;
    
    @IsArray()
    @IsNumber({}, { each: true })
    cancionId: number[];
    
}
