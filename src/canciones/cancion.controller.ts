import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CancionesService } from './cancion.service';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { SongFileInterceptor } from '../interceptors/file.intercerptor';

@Controller('/canciones')
export class CancionesController {
  constructor(private readonly cancionesService: CancionesService) {}

  @Get()
  findAll() {
    return this.cancionesService.findAllSongs();
  }

  @Post()
  @UseInterceptors(SongFileInterceptor.createFileInterceptor('file'))
  createOne(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCancionesDto: CreateCancionesDto,
  ) {
    if (!file) {
      throw new BadRequestException('El archivo es requerido');
    }
    createCancionesDto.filename = file.filename;
    return this.cancionesService.createOneSong(createCancionesDto);
  }

  @Patch('/:id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCancionesDto: UpdateCancionesDto,
  ) {
    return this.cancionesService.update(id, updateCancionesDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.cancionesService.remove(id);
  }
}
