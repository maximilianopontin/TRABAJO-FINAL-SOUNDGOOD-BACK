import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { console } from 'inspector';

@Controller('files')
export class FilesController {
    private readonly uploadSongsDir = join(__dirname, '..', '..', 'uploadsSongs'); // Ruta para canciones
    private readonly uploadImagesDir = join(__dirname, '..', '..', 'uploadsImages'); // Ruta para imágenes

    @Get(':type/:filename')
    downloadFile(@Param('type') type: string, @Param('filename') filename: string, @Res() res: Response) {
        // Validar el tipo de archivo
        const baseDir = type === 'song' ? this.uploadSongsDir : type === 'image' ? this.uploadImagesDir : null;
        console.info('baseDir', baseDir);
        if (!baseDir) {
            throw new NotFoundException('Tipo de archivo no válido.');
        }

        // Construir la ruta completa del archivo
        const filePath = join(baseDir, filename);

        // Verificar si el archivo existe
        console.log('filePath', filePath);
        if (!existsSync(filePath)) {
            throw new NotFoundException('Archivo no encontrado.');
        }

        // Enviar el archivo como respuesta
        res.sendFile(filePath, (err) => {
            if (err) {
                throw new NotFoundException('Ocurrió un problema al enviar el archivo.');
            }
        });
    }
}
