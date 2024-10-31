import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTop10Dto {
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    cancionId: number[];
}
