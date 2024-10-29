import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  @ApiResponse({status: 201, description:'El registro se ha creado correctamente.'})//define una respuesta HTTP personalizada
@ApiResponse({ status: 403, description: 'Prohibido.'})
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistasService.createOneArtist(createArtistaDto);
  }

  @Get()
  findAll() {
    return this.artistasService.findAllArtist();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistasService.findOneArtist(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistasService.updateArtist(+id, updateArtistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistasService.removeArtist(+id);
  }
}
