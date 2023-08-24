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
  Put,
  Query,
} from '@nestjs/common';
import { Users } from 'output/entities/Users';
import { TalentService } from './talent.service';
import { PaginationOptions } from './dto/pagination.dto';

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
      status: 0,
    });
  }

  // Search Talents by Name and Status
  @Get('search')
  async searchTalents(@Query() options: PaginationOptions) {
    try {
        const talents = await this.TalentService.search(options);
        return { message: 'Talents found successfully', data: talents };
    } catch (error) {
        return { message: 'Failed to search talents', error: error.message };
    }
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

  // Used to Update the Status 
  @Put('status/:id')
  async updateTalent(@Param('id') id: number, @Body() requestBody: { newRole: number; newModifiedDate: string }) {
    try {
      const updatedTalent = await this.TalentService.updateTalentRole(
        id,
        requestBody.newRole,
        requestBody.newModifiedDate
      );
      return { message: 'Talent updated successfully', talent: updatedTalent };
    } catch (error) {
      return { message: 'Failed to update talent', error: error.message };
    }
  }

  // Used to Create Client Contract

}
