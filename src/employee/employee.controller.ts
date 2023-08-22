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
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private EmployeeService: EmployeeService) {}
    
  // Get All Employees
  @Get('paging')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.EmployeeService.findAll({
      page: page,
      name: '',
      status: '',
    });
  }

  @Get('salaryhistory/:id')
  public async getEmployeePayHistory(@Param('id') id: number) {
    return this.EmployeeService.findEmployeePayHistory(id);
  }

  @Get('depthistory/:id')
  public async getDepartmentHistory(@Param('id') id: number) {
    return this.EmployeeService.findDepartmentHistory(id);
  }

  @Get('details/:id')
  public async getOneEmployee(@Param('id') id: number) {
    return this.EmployeeService.findOneEmployee(id);
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.EmployeeService.Insert(fields);
  }
}
