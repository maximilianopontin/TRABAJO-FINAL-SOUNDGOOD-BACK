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
                host: 'bx17b9g3igptpk7sfned-mysql.services.clever-cloud.com',            // Dirección del host de la base de datos
                port: 3306,                   // Puerto en el que se ejecuta la base de datos
                username: 'uu0ql1dd6vlfd2cy',             // Nombre de usuario para acceder a la base de datos
                password: '4N2P7BSrmpwMPjc9X38p',             // Contraseña para acceder a la base de datos
                database: 'bx17b9g3igptpk7sfned',     // Nombre de la base de datos a la que se conectará
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}', // Ruta donde se encuentran las entidades
                ],
                synchronize: true,           // Sincroniza la base de datos con el esquema de las entidades en cada ejecución (útil solo en desarrollo)
            });

            // Inicializa la conexión al DataSource y devuelve la instancia inicializada
            return dataSource.initialize();
        },
    },
];