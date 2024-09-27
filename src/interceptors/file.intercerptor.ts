import { BadRequestException, Injectable } from '@nestjs/common';
import { FileInterceptor as MulterInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto'; // Para generar UUID

@Injectable()
export class SongFileInterceptor {
  static createFileInterceptor(fieldName: string) {
    return MulterInterceptor(fieldName, {
      storage: diskStorage({
        // Configuración del almacenamiento en disco
        destination: './uploadsSongs', // Carpeta donde se guardarán las canciones subidas
        filename: (req, file, callback) => {
          // Función para generar un nombre de archivo único
          const uniqueSuffix = crypto.randomUUID();
          const ext = extname(file.originalname); // Extraemos la extensión original del archivo
          const filename = `song-${uniqueSuffix}${ext}`;
          // Combinamos el sufijo UUID con el prefijo 'song' y la extensión original
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Filtrar tipos de archivos permitidos
        const allowedTypes = /mp3|wav|aac|mpeg/; // Tipos de archivo permitidos
        const ext = extname(file.originalname).toLowerCase(); // Extraemos la extensión del archivo
        const mimeType = allowedTypes.test(file.mimetype); // Verificamos si el tipo MIME es correcto
        const extName = allowedTypes.test(ext); // Verificamos si la extensión es permitida
        if (mimeType && extName) {
          // Si el archivo es válido, pasamos el filtro
          return callback(null, true);
        } else {
          // Si no es válido, lanzamos una excepción
          callback(
            new BadRequestException('Only MP3, WAV, or AAC audio files are allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // Limitar el tamaño a 10 MB
    });
  }
}
