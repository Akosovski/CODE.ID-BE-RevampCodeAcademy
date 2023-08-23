/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TalentService } from './talent.service';

@Controller('talent')
export class TalentController {
  constructor(private TalentService: TalentService) {}

  // Get All Talents
  @Get('paging')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.TalentService.getAll({
      page: page,
      name: '',
      status: '',
    });
  }

  @Get('search')
  public async search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log("Page :", page);
    return this.TalentService.search({
      page: page,
      name: 'S',
      status: 'S',
    });
  }

  // Get One Talent
  @Get('details/:id')
  public async getOneTalent(@Param('id') id: number) {
    return this.TalentService.findOneTalent(id);
  }

  // Get One Talent for Placement
  @Get('placement/:id')
  public async getOneTalentPlacement(@Param('id') id: number) {
    return this.TalentService.findOneTalent(id);
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.TalentService.Insert(fields);
  }
}
