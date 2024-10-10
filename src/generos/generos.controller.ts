import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.createOneGenero(createGeneroDto);
  }

  @Get()
  findAll() {
    return this.generosService.findAllGenero();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generosService.findOneGenero(+id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE
  })
  ) id: number, @Body() updateGeneroDto: UpdateGeneroDto) {
    return this.generosService.updateOneGenero(+id, updateGeneroDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE

  }))id: number) {
    return this.generosService.removeOneGenero(+id);
  }
}
