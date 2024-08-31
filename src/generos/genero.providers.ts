import { DataSource } from 'typeorm';
import { Genero } from './entities/genero.entity';

export const generoProviders = [
    {
        // El proveedor se identifica por la cadena 'CANCION_REPOSITORY'
        provide: 'GENERO_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad canciones
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Genero),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];