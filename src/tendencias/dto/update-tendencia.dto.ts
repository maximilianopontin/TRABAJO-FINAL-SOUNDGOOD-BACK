import { PartialType } from '@nestjs/mapped-types';
import { CreateTendenciaDto } from './create-tendencia.dto';

export class UpdateTendenciaDto extends PartialType(CreateTendenciaDto) {}
