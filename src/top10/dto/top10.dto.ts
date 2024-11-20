import { ApiProperty } from "@nestjs/swagger";
import { CancionesDto } from "src/canciones/dto/canciones.dto";


export class Top10Dto {
    @ApiProperty()
    top10Id: number;
  
    @ApiProperty({ 
        type: [CancionesDto],
        description: 'Lista de canciones con sus géneros y artistas'
    
    })
    cancionId: CancionesDto[];
}
