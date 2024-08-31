import { Module } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artistas.controller';
import { DatabaseModule } from 'src/database/database.module';
import { artistaProviders } from './artistas.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistasController],
  providers: [...artistaProviders, ArtistasService],
  exports: [...artistaProviders]
})
export class ArtistasModule { }
