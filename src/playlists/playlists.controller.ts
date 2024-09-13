import { Controller, Get, Post, Body, Patch, Param,Query, NotFoundException, Delete } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlists } from './entities/playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.createOnePlaylist(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistsService.findAllPlaylists();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.playlistsService.findOnePlaylist(+id);
  }

  @Get('search')
  async searchPlaylists(@Query('title') title: string): Promise<Playlists[]> {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new NotFoundException('Debe proporcionar un nombre para buscar las playlists');
    }

    return this.playlistsService.findPlaylistByTitle(title);
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }*/
}
