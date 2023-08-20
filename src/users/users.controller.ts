/* eslint-disable prettier/prettier */
import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
export class UsersController {
  constructor(private services: UsersService) {}

  @Get('photo/:name')
  @Header('Content-Type', `image/${'png' || 'jpg' || 'jpeg'}`)
  @Header('Content-Disposition', 'attachment')
  getStaticPhoto(@Param('name') name: string): StreamableFile {
    const file = createReadStream(
      join(`${process.cwd()}/uploads/usermedia/photo/`, name),
    );
    return new StreamableFile(file);
  }

  @Get(':id')
  async GetOne(@Param('id') id: number) {
    return this.services.findOne(id);
  }
}