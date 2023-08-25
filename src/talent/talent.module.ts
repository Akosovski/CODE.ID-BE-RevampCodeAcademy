import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentController } from './talent.controller';
import { TalentService } from './talent.service';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { EmployeeClientContract } from 'output/entities/EmployeeClientContract';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forFeature([Employee, EmployeePayHistory, EmployeeClientContract, Users])],
  controllers: [TalentController],
  providers: [TalentService],
})
export class TalentModule {}
