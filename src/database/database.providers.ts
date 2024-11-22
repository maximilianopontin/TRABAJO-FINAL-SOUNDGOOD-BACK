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
                host: process.env.ENVIRONMENT === 'dev' ? 'localhost' : 'bx17b9g3igptpk7sfned-mysql.services.clever-cloud.com',
                port: 3306,
                username: process.env.ENVIRONMENT === 'dev' ? 'root' : 'uu0ql1dd6vlfd2cy',
                password: process.env.ENVIRONMENT === 'dev' ? '1234' : '4N2P7BSrmpwMPjc9X38p',
                database: process.env.ENVIRONMENT === 'dev' ? 'soundgood' : 'bx17b9g3igptpk7sfned',
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