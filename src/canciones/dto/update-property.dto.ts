import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdatePropertyDto {
    @ApiProperty({ description: 'Nuevo valor booleano para la propiedad' })
    @IsBoolean()
    value: boolean;
}
