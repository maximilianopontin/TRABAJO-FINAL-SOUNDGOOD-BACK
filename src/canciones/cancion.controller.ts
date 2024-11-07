import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, HttpStatus, ParseIntPipe, Query, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { CancionesService } from './cancion.service';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { AutenticacionGuard } from '../autenticacion/autenticacion.guard';
import { FilesInterceptor } from '../interceptors/file.intercerptor';
import { ApiResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


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
  @ApiResponse({ status: 201, description: 'El registro se ha creado correctamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @UseInterceptors(FilesInterceptor.getInterceptor(),

  )
  createOne(
    @UploadedFiles() files: { songFile?: Express.Multer.File[], imageFile?: Express.Multer.File[] },

    @Body() createCancionesDto: CreateCancionesDto,
  ) {
    if (!files || (!files.songFile && !files.imageFile)) {
      throw new BadRequestException('Se requieren ambos archivos: la canción y la imagen.');
    }
  
    // Asignar los nombres de archivo al DTO, si existen
    if (files.songFile && files.songFile[0]) {
      createCancionesDto.songFilename = files.songFile[0].filename; // Nombre del archivo de la canción
    }
    if (files.imageFile && files.imageFile[0]) {
      createCancionesDto.imageFilename = files.imageFile[0].filename; // Nombre del archivo de la imagen
    }
    return this.cancionesService.createOneSong(createCancionesDto);

  }

  // Actualizar una canción existente por id
  @Patch('/:id')
  @UseInterceptors(FilesInterceptor.getInterceptor(),
  )
  update(
    @UploadedFiles() files: { songFile?: Express.Multer.File[], imageFile?: Express.Multer.File[] },

    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updateCancionDto: UpdateCancionesDto
  ) {
    if (!files) {
      throw new BadRequestException('El archivo es requerido');
    }
    // Si se proporciona un nuevo archivo de canción, actualiza el filename
    updateCancionDto.songFilename = files[0].filename;

    // Si se proporciona una nueva imagen, actualiza el imageFilename
    if (!files) {
      updateCancionDto.imageFilename = files[0].filename;
    }
    // Llama al servicio para actualizar la canción con los datos proporcionados
    return this.cancionesService.updateOneCancion(id, updateCancionDto);
  }


  // Eliminar una canción por id
  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.cancionesService.remove(id);
  }
}


