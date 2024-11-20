import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { Top10Service } from './top10.service';
import { UpdateTop10Dto } from './dto/update-top10.dto';
import { Top10 } from './entities/top10.entity';

@Controller('top10')
export class Top10Controller {
  constructor(private readonly top10Service: Top10Service) {}

  @Post()
  async crearTop10(@Body('cancionesId') cancionesId: number[]): Promise<Top10> {
    return this.top10Service.createTop10(cancionesId);
  }

  @Get()
  async findAll() {
  return await this.top10Service.findAllTop10();
   }
    

  @Patch(':id')
  update(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE
  })) id: number,
   @Body() updateTop10Dto: UpdateTop10Dto) {
    return this.top10Service.updateTop10(id, updateTop10Dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE
  })) id: number) {
    return this.top10Service.removeTop10(id);
  }
}
