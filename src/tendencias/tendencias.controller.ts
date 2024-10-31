import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { TendenciasService } from './tendencias.service';
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

  @Patch(':id')
  update(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE
  })) id: number,
   @Body() updateTendenciaDto: UpdateTendenciaDto) {
    return this.tendenciasService.updateTendencia(id, updateTendenciaDto);
  }

  @Delete(':id')
  remove(@Param('id',new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE
  })) id:number) {
    return this.tendenciasService.removeTendencia(id);
  }
}
