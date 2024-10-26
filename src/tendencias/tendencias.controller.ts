import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TendenciasService } from './tendencias.service';
import { CreateTendenciaDto } from './dto/create-tendencia.dto';
import { UpdateTendenciaDto } from './dto/update-tendencia.dto';
import { Tendencia } from './entities/tendencia.entity';

@Controller('tendencias')
export class TendenciasController {
  constructor(private readonly tendenciasService: TendenciasService) {}

  @Post()
  async createTendencia(@Body('cancionesId') cancionesId: number[]):Promise<Tendencia> {
    return this.tendenciasService.createTendencia(cancionesId);
  }

  @Get()
  findAll() {
    return this.tendenciasService.findAllTendencia();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tendenciasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTendenciaDto: UpdateTendenciaDto) {
    return this.tendenciasService.update(+id, updateTendenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tendenciasService.remove(+id);
  }
}
