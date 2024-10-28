import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  @ApiResponse({status: 201, description:'El registro se ha creado correctamente.'})
  @ApiResponse({ status: 403, description: 'Prohibido.'})
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
