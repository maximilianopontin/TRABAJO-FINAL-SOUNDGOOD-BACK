import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import {MercadopagoService} from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadopagoService) {}


@Get("/")
async getPreference (){
  return this.mercadoPagoService.getPreference();

}

@Post('/create-preference')
async createPreference(@Body() preferenceData) {
    try {
        const response = await this.mercadoPagoService.createPreference(preferenceData);
        return { 
            id: response.body.id,
            init_point: response.body.init_point // Asegúrate de incluir esto
        };
    } catch (error) {
        console.error('Error al crear preferencia:', error);
        throw new HttpException('No se pudo crear la preferencia', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}