import { DataSource } from 'typeorm';
import { Favoritos } from './entities/favorito.entity';

export const favoritoProviders = [
    {
        // El proveedor se identifica por la cadena 'FAVORITO_REPOSITORY'
        provide: 'FAVORITO_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad Favorito
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Favoritos),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];