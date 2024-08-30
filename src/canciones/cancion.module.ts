import { Module } from '@nestjs/common';
import { CancionesService } from './cancion.service';
import { CancionesController } from './cancion.controller';
import { cancionProviders } from './cancion.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CancionesController],
  providers: [...cancionProviders, CancionesService],
  exports: [...cancionProviders]
})
export class CancionesModule { }
