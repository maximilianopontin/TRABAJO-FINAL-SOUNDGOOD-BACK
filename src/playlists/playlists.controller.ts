import { Controller, Get, Post, Body, Patch, Param,Query, NotFoundException, Delete, ParseIntPipe, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlists } from './entities/playlist.entity';
import { ApiResponse } from '@nestjs/swagger';
import { AutenticacionGuard } from 'src/autenticacion/autenticacion.guard';
import { PlaylistCancionesDto, PlaylistDto } from './dto/playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(AutenticacionGuard)
  @ApiResponse({status: 201, description:'El registro se ha creado correctamente.'})
  @ApiResponse({ status: 403, description: 'Prohibido.'})
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Request() req) {
    const userId = req.user.sub
    createPlaylistDto.usuarioId = userId;
    console.log(createPlaylistDto);
    
    return this.playlistsService.createOnePlaylist(createPlaylistDto);
  }

//Devuelve las playlists del usuario
  @Get()
  @UseGuards(AutenticacionGuard)
  findAll(@Request() req): Promise<PlaylistDto[]> {
    const userId = req.user.sub
    return this.playlistsService.findAllPlaylists(userId);
  }

//Devuelve las canciones en las playlists del usuario
  @Get(':playlistId')
  @UseGuards(AutenticacionGuard)
  findOne(@Param('playlistId') playlistId: number, @Request() req): Promise<PlaylistCancionesDto>{
    const usuarioId = req.user.sub
    return this.playlistsService.findOnePlaylist(+playlistId, usuarioId);
  }

  @Get('search/by-title')
  async searchPlaylists(@Query('title') title: string): Promise<Playlists[]> {
    return this.playlistsService.findPlaylistByTitle(title);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
    HttpStatus.NOT_ACCEPTABLE
  })) id: number) {
    return this.playlistsService.deleteOnePlaylist(id);
  }

  //Manejo de las canciones que agregamos o sacamos de las playlist
  @Post(':playlistId/cancion/:cancionId')
  @UseGuards(AutenticacionGuard)
  addCancionToPlaylist(@Param('playlistId', ParseIntPipe) playlistId:number, @Param('cancionId', ParseIntPipe) cancionId: number, @Request() req): Promise<void> {
    const usuarioId = req.user.sub
    return this.playlistsService.addCancionToPlaylist( playlistId,cancionId, usuarioId);
  }

  @Delete(':playlistId/cancion/:cancionId')
  @UseGuards(AutenticacionGuard)
  removeCancionToPlaylist( @Param('playlistId', ParseIntPipe) playlistId:number,@Param('cancionId', ParseIntPipe) cancionId: number, @Request() req): Promise<void> {
    const userId = req.user.sub
    return this.playlistsService.removeCancionToPlaylist(playlistId, cancionId, userId);
  }
}
