import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentController } from './talent.controller';
import { TalentService } from './talent.service';
import { Employee } from 'output/entities/Employee';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forFeature([Employee, EmployeePayHistory, EmployeeDepartmentHistory])],
  controllers: [TalentController],
  providers: [TalentService],
})
export class TalentModule {}
