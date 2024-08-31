import { Module } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { GenerosController } from './generos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { generoProviders } from './genero.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [GenerosController],
  providers: [...generoProviders ,GenerosService],
  exports: [...generoProviders]
})
export class GenerosModule {}
