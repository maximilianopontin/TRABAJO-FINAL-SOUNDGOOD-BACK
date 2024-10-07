import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  // Obtener todas las canciones
  @Get()
  findAll() {
    return this.cancionesService.findAllSongs();
  }

  // Obtener una canción por id
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cancionesService.findOneSong(id);
  }

  // Buscar una canción por título http://localhost:3000/canciones/buscar/titulo?titulo=lud
  @Get('/buscar/titulo')
  findOneByTitle(@Query('titulo') titulo: string) {
    if (!titulo) {
      throw new BadRequestException(`la cancion ${titulo} no existe`);
    }
    return this.cancionesService.findOneSongByTitle(titulo);
  }
  

  // Crear una nueva canción con archivo
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

  // Actualizar una canción existente por id
  @Patch('/:id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updateCancionDto: UpdateCancionesDto
  ) {
    return this.cancionesService.updateOneCancion(id,updateCancionDto);
  }


  // Eliminar una canción por id
  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.cancionesService.remove(id);
  }
}

