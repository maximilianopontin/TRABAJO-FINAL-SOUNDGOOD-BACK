import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AutenticacionGuard } from 'src/autenticacion/autenticacion.guard';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}
 
  @Post('/agregar')
  @UseGuards(AutenticacionGuard)
  @ApiResponse({status: 201, description:'El registro se ha creado correctamente.'})
  @ApiResponse({ status: 403, description: 'Prohibido.'})
  create(@Body() createFavoritoDto: CreateFavoritoDto, @Request() req ) {
    const userId = req.user.sub
    createFavoritoDto.usuarioId = userId;
    console.log(userId);
    
    return this.favoritosService.createOneFavorite(createFavoritoDto);
  }

  @Get()
  findAll() {
    return this.favoritosService.findAllFavorites();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritosService.findOneFavorite(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFavoritoDto: UpdateFavoritoDto) {
    return this.favoritosService.updateFavorite(+id, updateFavoritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritosService.removeFavorite(+id);
  }
}
