import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { Batch } from 'output/entities/Batch';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forFeature([Employee, EmployeePayHistory, EmployeeDepartmentHistory, Users, Batch])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
