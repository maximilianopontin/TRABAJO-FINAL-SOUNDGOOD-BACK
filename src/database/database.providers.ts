import { DataSource } from "typeorm";

// Exporta un array de proveedores de base de datos que serán usados en otros módulos de la aplicación
export const databaseProviders = [
    {
        // El proveedor se identifica por la cadena 'DATA_SOURCE'
        provide: 'DATA_SOURCE',

        // Define una fábrica asíncrona que crea e inicializa un objeto DataSource
        useFactory: async () => {
            // Crea una nueva instancia de DataSource con la configuración especificada
            const dataSource = new DataSource({
                type: 'mysql',                // Tipo de base de datos (MySQL)
                host: process.env.ENVIRONMENT === 'dev' ? process.env.DB_HOSTLOCAL : process.env.DB_HOST,
                port: 3306,
                username: process.env.ENVIRONMENT === 'dev' ? process.env.DB_USERLOCAL : process.env.DB_USER,
                password: process.env.ENVIRONMENT === 'dev' ? process.env.DB_PASSWORDLOCAL : process.env.DB_PASSWORD,
                database: process.env.ENVIRONMENT === 'dev' ? process.env.DB_NAMELOCAL : process.env.DB_NAME,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            // Inicializa la conexión al DataSource y devuelve la instancia inicializada
            return dataSource.initialize();
        },
    },
];