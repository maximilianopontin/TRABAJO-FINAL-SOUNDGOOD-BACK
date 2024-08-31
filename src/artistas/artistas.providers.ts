import { DataSource } from 'typeorm';
import { Artistas } from './entities/artista.entity';

export const artistaProviders = [
    {
        // El proveedor se identifica por la cadena 'CANCION_REPOSITORY'
        provide: 'ARTISTA_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad canciones
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Artistas),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];