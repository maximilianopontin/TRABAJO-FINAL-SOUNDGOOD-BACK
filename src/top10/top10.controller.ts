import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.top10Service.findAllTop10();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.top10Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTop10Dto: UpdateTop10Dto) {
    return this.top10Service.update(+id, updateTop10Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.top10Service.remove(+id);
  }
}
