import { Module } from "@nestjs/common";
import { databaseProviders } from "src/database/database.providers";

// Define un módulo de base de datos en NestJS
@Module({
    // Registra los proveedores de la base de datos en el módulo
    providers: [...databaseProviders],

    // Exporta los proveedores para que puedan ser usados en otros módulos de la aplicación
    exports: [...databaseProviders]
})
export class DatabaseModule { }