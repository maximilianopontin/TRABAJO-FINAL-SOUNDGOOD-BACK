import { BadRequestException, Injectable } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto'; // Para generar UUID

@Injectable()
export class FilesInterceptor {
  static getInterceptor() {
    return FileFieldsInterceptor(
      [
        { name: 'songFile', maxCount: 1 },
        { name: 'imageFile', maxCount: 1 }
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const destinationPath = file.fieldname === 'songFile' ? './uploadsSongs' : './uploadsImages';
            cb(null, destinationPath);
          },
          filename: (req, file, cb) => {
            const uniqueSuffix = crypto.randomUUID();
            const ext = extname(file.originalname);
            const prefix = file.fieldname === 'songFile' ? 'song' : 'image';
            const filename = `${prefix}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
        fileFilter: (req, file, cb) => {
          const allowedTypes = file.fieldname === 'songFile'
            ? /mp3|wav|aac|mpeg/
            : /jpeg|jpg|png|gif/;
          const ext = extname(file.originalname).toLowerCase();
          const isMimeTypeValid = allowedTypes.test(file.mimetype);
          const isExtNameValid = allowedTypes.test(ext);
          if (isMimeTypeValid && isExtNameValid) {
            cb(null, true);
          } else {
            cb(
              new BadRequestException(
                file.fieldname === 'songFile'
                  ? 'Solo se permiten archivos MP3, WAV o AAC para la canción'
                  : 'Solo se permiten archivos JPEG, PNG o GIF para la imagen'
              ),
              false
            );
          }
        },
        limits: {
          fileSize: 10 * 1024 * 1024, // 10MB
        },
      }
    );
  }
}