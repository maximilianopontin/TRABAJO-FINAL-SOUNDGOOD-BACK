import { BadRequestException, Injectable } from '@nestjs/common';
import { FileInterceptor as MulterInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto'; // Para generar UUID

@Injectable()
export class ImageFileInterceptor {
  static createFileInterceptor(fieldName: string) {
    return MulterInterceptor(fieldName, {
      storage: diskStorage({
        destination: './uploadsImages', 
        filename: (req, file, callback) => {
          const uniqueSuffix = crypto.randomUUID();
          const ext = extname(file.originalname);
          const filename = `image-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const ext = extname(file.originalname).toLowerCase();
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(ext);
        if (mimeType && extName) {
          return callback(null, true);
        } else {
          callback(
            new BadRequestException('Solo se permiten archivos JPEG, PNG o GIF'),
            false,
          );
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // Limitar a 5 MB
    });
  }
}
