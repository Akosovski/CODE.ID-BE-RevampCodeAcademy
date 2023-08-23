/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { Batch } from 'output/entities/Batch';
import { In, Repository } from 'typeorm';
import { PaginationOptions } from './dto/pagination.dto';
import { EmployeeInterface, UsersInterface } from './talent.interface';

@Injectable()
export class TalentService {
  constructor(
    @InjectRepository(Employee)
    private serviceEmp: Repository<Employee>,
    @InjectRepository(EmployeePayHistory)
    private serviceEmpPayHistory: Repository<EmployeePayHistory>,
    @InjectRepository(EmployeeDepartmentHistory)
    private serviceEmpDeptHistory: Repository<EmployeeDepartmentHistory>,
    @InjectRepository(Batch)
    private serviceBatch: Repository<Batch>,
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
  ) {}

  // Get All Talents
  public async getAll(options: PaginationOptions): Promise<UsersInterface> {
    const queryBuilder = this.serviceUsers.createQueryBuilder('talents');

    queryBuilder
      .leftJoinAndSelect('talents.batchTrainees', 'batchTrainees') // Join to Batch Trainees
      .leftJoinAndSelect('batchTrainees.batrBatch', 'batrBatch') // Join to Batch
      .addSelect(['batrBatch.batchName']) // Get Batch Name
      .leftJoin('batrBatch.batchEntity', 'batchEntity') // Join to Program Entity
      .addSelect(['batchEntity.progTitle']) // Get Program Title
      .orderBy('talents.userEntityId', 'ASC')
  
    queryBuilder.where('talents.userCurrentRole IN (:...roles)', { roles: [2, 12] });

    // Seperate Query to Count the Totals
    const countQueryBuilder = this.serviceUsers.createQueryBuilder('talents');
    countQueryBuilder.where('talents.userCurrentRole IN (:...roles)', { roles: [2, 12] });
    const totalCount = await countQueryBuilder.getCount();

    const talents = await queryBuilder.getMany();

    return {
      totalCount,
      page: options.page,
      data: talents,
    };
  }

  /* Search */
  public async search(options: PaginationOptions): Promise<UsersInterface> {
    const queryBuilder = this.serviceUsers.createQueryBuilder('talents');

    queryBuilder
    .leftJoinAndSelect('talents.batchTrainees', 'batchTrainees') // Join to Batch Trainees
    .leftJoinAndSelect('batchTrainees.batrBatch', 'batrBatch') // Join to Batch
    .addSelect(['batrBatch.batchName']) // Get Batch Name
    .leftJoin('batrBatch.batchEntity', 'batchEntity') // Join to Program Entity
    .addSelect(['batchEntity.progTitle']) // Get Program Title
    .orderBy('talents.userEntityId', 'ASC')
  
    queryBuilder.where('talents.userCurrentRole IN (:...roles)', { roles: [2, 12] });

    // Seperate Query to Count the Totals
    const countQueryBuilder = this.serviceUsers.createQueryBuilder('talents');
    countQueryBuilder.where('talents.userCurrentRole IN (:...roles)', { roles: [2, 12] });
    const totalCount = await countQueryBuilder.getCount();

    const talents = await queryBuilder.getMany();

    return {
      totalCount,
      page: options.page,
      data: talents,
    };
  }

  // Get One Talent According to ID
  public async findOneTalent(id: number) {
    const queryBuilder = this.serviceUsers.createQueryBuilder('talents')
      .where('talents.userEntityId = :id', { id })
      .leftJoinAndSelect('talents.usersEmails', 'usersEmails')
      .leftJoinAndSelect('talents.usersPhones', 'usersPhones')
      .leftJoinAndSelect('talents.batchTrainees', 'batchTrainees') // Join to Batch Trainees
      .leftJoinAndSelect('batchTrainees.batrBatch', 'batrBatch') // Join to Batch
      .leftJoin('batrBatch.batchEntity', 'batchEntity') // Join to Program Entity
      .addSelect(['batchEntity.progTitle']) // Get Program Title
      .orderBy('talents.userEntityId', 'ASC')
  
    const talent = await queryBuilder.getOne();
    return talent;
  }

  public async Insert(fields: any) {
    try {
      //Insert into hr.Employee Table
      const employee = await this.serviceEmp.save({
        empEntityId: fields.empEntityId,
        empEmpNumber: fields.empEmpNumber,
        empNationalId: fields.empNationalId,
        empBirthDate: fields.empBirthDate,
        empMaritalStatus: fields.empMaritalStatus,
        empGender: fields.empGender,
        empHireDate: fields.empHireDate,
        empSalariedFlag: fields.empSalariedFlag,
        empVacationHours: fields.empVacationHours,
        empSickleaveHours: fields.empSickleaveHours,
        empCurrentFlag: fields.empCurrentFlag,
        empModifiedDate: new Date(),
        empType: fields.empType,
        empJoroId: fields.empJoroId,
        empEmpEntityId: fields.empEmpEntityId,
      });

      //Insert into hr.EmployeePayHistory Table
      await this.serviceEmpPayHistory.save({
        ephiEntityId: employee.empEntityId,
        ephiRateSalary: fields.ephiRateSalary,
        ephiPayFrequence: fields.ephiPayFrequence,
        ephiModifiedDate: new Date(),
      });

      //Insert into hr.EmployeeDepartmentHistory Table
      await this.serviceEmpDeptHistory.save({
        edhiId: employee.empEntityId,
        edhiStartDate: fields.edhiStartDate,
        edhiEndDate: fields.edhiEndDate,
        edhiModifiedDate: new Date(),
        edhiDeptId: fields.edhiDeptId,
      });

      const result = await this.serviceEmp.findOne({
        where: { empEntityId: employee.empEmpEntityId },
        relations: ['employeeDepartmentHistories', 'employeePayHistories'],
      });

      return result;
    } catch (error) {
      return error.message;
    }
  }
}
