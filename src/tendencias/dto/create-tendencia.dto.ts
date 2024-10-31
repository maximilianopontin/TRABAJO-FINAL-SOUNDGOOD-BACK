import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTendenciaDto {
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    cancionId: number[];
}
