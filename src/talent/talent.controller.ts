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
import { PaginationOptions } from './dto/pagination.dto';

@Controller('talent')
export class TalentController {
  constructor(private TalentService: TalentService) {}

  // Get All Talents
  @Get('paging')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number,
  ) {
    return this.TalentService.getAll({
      page: page,
      limit: limit,
      name: '',
      status: '',
    });
  }

  @Get('search')
  public async search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number,
  ) {
    console.log("Page :", page);
    return this.TalentService.getAll({
      page: page,
      limit: limit,
      name: 'S',
      status: 'S',
    });
  }

  @Get('salaryhistory/:id')
  public async getEmployeePayHistory(@Param('id') id: number) {
    return this.TalentService.findEmployeePayHistory(id);
  }

  @Get('depthistory/:id')
  public async getDepartmentHistory(@Param('id') id: number) {
    return this.TalentService.findDepartmentHistory(id);
  }

  // Get One Employee
  @Get('details/:id')
  public async getOneEmployee(@Param('id') id: number) {
    return this.TalentService.findOne(id);
  }
  
  // Get All Employees
  @Get('employees')
  public async getAllLimit(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number,
  ) {
    return this.TalentService.findAllLimit({
      page: page,
      limit: limit,
      name: '',
      status: '',
    });
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.TalentService.Insert(fields);
  }
}
