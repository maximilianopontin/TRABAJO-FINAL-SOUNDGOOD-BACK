import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }
  
 
  @Get()
  findAll() {
    return this.usuariosService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
      HttpStatus.NOT_ACCEPTABLE
  })
  )
  id: number,) {
    return this.usuariosService.findOneUser(+id);
  }
  
  @Patch(':id')
  update(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
      HttpStatus.NOT_ACCEPTABLE
  })) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateOneUser(id, updateUsuarioDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:
      HttpStatus.NOT_ACCEPTABLE
  })
  ) id: number) {
    return this.usuariosService.deleteOneUser(+id);
  }
}
