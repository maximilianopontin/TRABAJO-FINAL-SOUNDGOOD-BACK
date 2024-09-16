// Este proveedor permite que el repositorio de Usurio esté disponible en toda la aplicación, facilitando las operaciones de base de datos relacionadas con la entidad Usuario. Exporta un array de proveedores para la entidad Usuario

import { DataSource } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

export const usuarioProviders = [
    {
        // El proveedor se identifica por la cadena 'USUARIO_REPOSITORY'
        provide: 'USUARIO_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad Usuario
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];