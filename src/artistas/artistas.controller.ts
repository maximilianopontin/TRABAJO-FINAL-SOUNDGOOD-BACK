import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistasService.createOneArtist(createArtistaDto);
  }

  @Get()
  findAll() {
    return this.artistasService.findAllArtist();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistasService.update(+id, updateArtistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistasService.remove(+id);
  }
}
