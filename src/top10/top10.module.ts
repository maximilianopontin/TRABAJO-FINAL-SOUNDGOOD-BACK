import { Module } from '@nestjs/common';
import { Top10Controller } from './top10.controller';
import { DatabaseModule } from 'src/database/database.module';
import { top10Providers } from './top10.providers';
import { cancionProviders } from 'src/canciones/cancion.providers';
import { Top10Service } from './top10.service';
@Module({
  imports: [DatabaseModule],
  controllers: [Top10Controller],
  providers: [...top10Providers, ...cancionProviders, Top10Service],
  exports: [...top10Providers]
})
export class Top10Module {}
