import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; //permite documentar y probar nuestra app de manera tal que el cliente tenga una interaccion real con el proyecto




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Lanza una excepción si se envían propiedades no permitidas
    transform: true, // Transforma los datos entrantes a los tipos esperados 
  }),

  );
  const config = new DocumentBuilder()//ayuda a estructurar un documento base que se ajuste a la especificación OpenAPI. Proporciona varios métodos que permiten configurar propiedades como título, descripción, versión
    .setTitle('SoundGood example')
    .setDescription('The Sound Good API description')
    .setVersion('1.0')
    .addTag('Sound Good')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);//Para crear un documento completo (con todas las rutas HTTP definidas), utilizamos el createDocument()método de la SwaggerModuleclase. 
  //Este método toma dos argumentos, una instancia de aplicación y un objeto de opciones Swagger
  SwaggerModule.setup('doc.api', app, documentFactory);////Una vez que creamos un documento, podemos llamar al setup()método. Acepta:
  //La ruta para montar la interfaz de usuario Swagger
    //Una instancia de aplicación
    //El objeto de documento instanciado arriba
  //Parámetro de configuración opcional
  
  
  app.enableCors();
  app.use(cors()); // Habilitar CORS
  await app.listen(8080);//cambio a puerto 8080 para desarrollo

}
bootstrap();
