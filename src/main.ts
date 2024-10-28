import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Lanza una excepción si se envían propiedades no permitidas
    transform: true, // Transforma los datos entrantes a los tipos esperados 
  }),

  );
  const config = new DocumentBuilder()
    .setTitle('SoundGood example')
    .setDescription('The Sound Good API description')
    .setVersion('1.0')
    .addTag('Sound Good')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc.api', app, documentFactory);
  
  app.enableCors();
  await app.listen(8080);//cambio a puerto 8080 para desarrollo

}
bootstrap();
