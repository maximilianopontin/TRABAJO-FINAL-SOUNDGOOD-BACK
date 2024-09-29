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
        destination: './uploadsSongs', 
        filename: (req, file, callback) => {
          const uniqueSuffix = crypto.randomUUID();
          const ext = extname(file.originalname);
          const filename = `song-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = /mp3|wav|aac|mpeg/;
        const ext = extname(file.originalname).toLowerCase();
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(ext);
        if (mimeType && extName) {
          return callback(null, true);
        } else {
          callback(
            new BadRequestException('Solo se permiten archivos MP3, WAV o AAC'),
            false,
          );
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // Limitar a 10 MB
    });
  }
}
