import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, HttpStatus, ParseIntPipe, Query, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { CancionesService } from './cancion.service';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { AutenticacionGuard } from '../autenticacion/autenticacion.guard';
import { SongFileInterceptor } from '../interceptors/file.intercerptor';

@Controller('canciones')
export class CancionesController {
  constructor(private readonly cancionesService: CancionesService) { }
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
  //inyectar decorador useguards
  @UseGuards(AutenticacionGuard)
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
  @UseInterceptors(SongFileInterceptor.createFileInterceptor('file'))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updateCancionDto: UpdateCancionesDto
  ) {
    if (!file) {
      throw new BadRequestException('El archivo es requerido');
    }
    updateCancionDto.filename = file.filename;
    return this.cancionesService.updateOneCancion(id, updateCancionDto);
  }


  // Eliminar una canción por id
  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.cancionesService.remove(id);
  }
}
 

