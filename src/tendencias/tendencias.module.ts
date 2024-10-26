import { Module } from '@nestjs/common';
import { TendenciasService } from './tendencias.service';
import { TendenciasController } from './tendencias.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tendenciaProviders } from './tendencias.providers';
import { cancionProviders } from 'src/canciones/cancion.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TendenciasController],
  providers: [...tendenciaProviders, ...cancionProviders,TendenciasService],
  exports: [...tendenciaProviders]
})
export class TendenciasModule {}
