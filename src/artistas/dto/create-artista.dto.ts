import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty, } from "class-validator";

export class CreateArtistaDto {
    @ApiProperty()//Para que las propiedades de la clase sean visibles para el SwaggerModule, tenemos que anotarlas con el @ApiProperty()decorador 
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nombre: string;  
}
