import { Injectable } from '@nestjs/common';

import * as mercadopago from 'mercadopago';


@Injectable()
export class MercadopagoService {
    constructor() {         // Configurar MercadoPago usando el token de acceso

        mercadopago.configure({
            access_token: process.env.MP_ACCESS_TOKEN,

        })
    }

async getPreference(){
    return {message: "Estas en mercado pago"}
};

    async createPreference(preferenceData) {

        return mercadopago.preferences.create(preferenceData);

}

}


