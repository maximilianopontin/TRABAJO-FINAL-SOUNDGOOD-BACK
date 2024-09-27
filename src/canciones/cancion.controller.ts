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
import { SongFileInterceptor } from '../interceptors/file.intercerptor'; // Asegúrate de importar correctamente tu interceptor

@Controller('/canciones')
export class CancionesController {
  constructor(private readonly cancionesService: CancionesService) {}

  @Get()
  findAll() {
    return this.cancionesService.findAllSongs();
  }

  @Post()
  @UseInterceptors(SongFileInterceptor.createFileInterceptor('file')) // interceptor creado
  createOne(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCancionesDto: CreateCancionesDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is required'); // Si no se sube un archivo, lanza una excepción
    }
    createCancionesDto.filename = file.filename; // Asigna el nombre del archivo subido al DTO
    return this.cancionesService.createOneSong(createCancionesDto); // Llama al servicio para crear un registro
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
