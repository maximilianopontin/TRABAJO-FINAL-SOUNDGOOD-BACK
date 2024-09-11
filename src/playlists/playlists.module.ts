import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { playlistProviders } from './playlists.providers';
import { usuarioProviders } from 'src/usuarios/usuario.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaylistsController],
  providers: [...playlistProviders, ...usuarioProviders, PlaylistsService],
  exports : [...playlistProviders]
})
export class PlaylistsModule { }
