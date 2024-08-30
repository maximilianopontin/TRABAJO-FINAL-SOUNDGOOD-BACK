// Este proveedor permite que el repositorio de cancion esté disponible en toda la aplicación, facilitando las operaciones de base de datos relacionadas con la entidad Cancion. Exporta un array de proveedores para la entidad Cancion

import { DataSource } from 'typeorm';
import { Canciones } from './entities/cancion.entity';

export const cancionProviders = [
    {
        // El proveedor se identifica por la cadena 'CANCION_REPOSITORY'
        provide: 'CANCION_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad canciones
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Canciones),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];