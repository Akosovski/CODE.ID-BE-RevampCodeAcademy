/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common/decorators';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class UploadMulter {
  static MulterOption(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const filename = file.originalname;
          return callback(null, filename);
        },
      }),

      fileFilter(req, file, callback) {
        file.filename = file.filename + file.mimetype;
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          callback(null, true);
        } else {
          return callback(
            new Error('Only .png .jpg .jpeg extension allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 1 * 1024 * 1024 },
    };
  }
}
