/* eslint-disable prettier/prettier */
import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UserMediaMulter {
  static MulterOption(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          if (file.fieldname === 'resume') {
            return callback(null, './uploads/usermedia/resume');
          } else if (file.fieldname === 'photo') {
            callback(null, './uploads/usermedia/photo');
          }
        },
        filename(req, file, callback) {
          if (file.fieldname === 'resume') {
            const filename = file.originalname;
            return callback(null, filename);
          } else if (file.fieldname === 'photo') {
            const filename = `userimage-${Date.now()}${extname(
              file.originalname,
            )}`;
            return callback(null, filename);
          }
        },
      }),
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|pdf|word)$/)) {
          callback(null, true);
        } else {
          return callback(
            new UnsupportedMediaTypeException(
              'Only jpg pdf or word format allowed',
            ),
            false,
          );
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    };
  }
}