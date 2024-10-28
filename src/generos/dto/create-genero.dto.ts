import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateGeneroDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    genero: string;
}
