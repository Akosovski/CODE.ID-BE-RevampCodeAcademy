/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TalentService } from './talent.service';
import { PaginationOptions } from './dto/pagination.dto';

@Controller('talent')
export class TalentController {
  constructor(private TalentService: TalentService) {}

  @Get()
  public async findAll() {
    return this.TalentService.findAll();
  }

  @Get('search')
  public async search(@Query() options: PaginationOptions) {
    const room = this.TalentService.searchBy(options);
    return room;
  }

  @Get('paging')
  public async getAllLimit(@Query() options: PaginationOptions) {
    const room = this.TalentService.findAllLimit(options);
    return room;
  }

  @Get('salaryhistory/:id')
  public async getEmployeePayHistory(@Param('id') id: number) {
    return this.TalentService.findEmployeePayHistory(id);
  }

  @Get('depthistory/:id')
  public async getDepartmentHistory(@Param('id') id: number) {
    return this.TalentService.findDepartmentHistory(id);
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return this.TalentService.findOne(id);
  }
}
