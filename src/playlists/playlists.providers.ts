import { DataSource } from 'typeorm';
import { Playlists } from './entities/playlist.entity';

export const playlistProviders = [
    {
        // El proveedor se identifica por la cadena 'PLAYLIST_REPOSITORY'
        provide: 'PLAYLIST_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad playlists
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Playlists),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];