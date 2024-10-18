import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';//biblioteca de Node.js que ayuda a asegurar aplicaciones web configurando cabeceras HTTP

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());//configuramos helmet para toda la app
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Lanza una excepción si se envían propiedades no permitidas
    transform: true, // Transforma los datos entrantes a los tipos esperados 
  }),

  );
  app.enableCors();
  await app.listen(8080);//cambio a puerto 8080 para desarrollo

}
bootstrap();
