import { PartialType } from '@nestjs/mapped-types';
import { CreateCancionesDto } from './create-canciones.dto';

export class UpdateCancionesDto extends PartialType(CreateCancionesDto) {}
