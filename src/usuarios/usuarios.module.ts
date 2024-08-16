import { Module } from '@nestjs/common';
import { usuarioProviders } from './usuario.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [...usuarioProviders, UsuariosService],
  exports: [...usuarioProviders]
})
export class UsuariosModule {}
