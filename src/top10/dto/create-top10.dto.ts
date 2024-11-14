import { ApiProperty } from "@nestjs/swagger";
import { CreateCancionesDto } from "src/canciones/dto/create-canciones.dto";

export class CreateTop10Dto {
    @ApiProperty()
    top10Id: number;
  
    @ApiProperty({ type: [CreateCancionesDto] })
    cancionId: CreateCancionesDto[];
}
