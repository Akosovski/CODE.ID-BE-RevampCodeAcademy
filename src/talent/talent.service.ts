/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { Batch } from 'output/entities/Batch';
import { Like, Repository } from 'typeorm';
import { PaginationOptions } from './dto/pagination.dto';
import { EmployeeInterface } from './talent.interface';

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

  public async getAll(
    options: PaginationOptions,
  ): Promise<EmployeeInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceEmp.count();
    const employee = await this.serviceEmp.find({
      relations: ['empEntity'],
      take: options.limit,
      skip: skippedItems,
    });
    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: employee,
    };
  }

  public async findAllLimit(
    options: PaginationOptions,
  ): Promise<EmployeeInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceEmp.count();
    const employee = await this.serviceEmp.find({
      relations: [
        'empEntity',
        'employeeClientContracts',
        'employeeClientContracts.eccoStatus',
        'employeeDepartmentHistories',
        'employeeDepartmentHistories.edhiDept',
        'employeePayHistories',
      ],
      take: options.limit,
      skip: skippedItems,
      order: {
        empEntityId: 'ASC',
      },
    });
    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: employee,
    };
  }

  public async findEmployeePayHistory(id: number) {
    const employeepayhistory = await this.serviceEmpPayHistory.findOne({
      where: { ephiEntityId: id },
    });

    return employeepayhistory;
  }

  public async findDepartmentHistory(id: number) {
    const depthistory = await this.serviceEmpDeptHistory.findOne({
      where: { edhiId: id },
      relations: ['edhiDept'],
    });

    return depthistory;
  }

  public async findOne(id: number) {
    const employee = await this.serviceEmp.findOne({
      where: { empEntityId: id },
      relations: [
        'empEntity',
        'employeeClientContracts',
        'employeeClientContracts.eccoStatus',
        'employeeDepartmentHistories',
        'employeeDepartmentHistories.edhiDept',
        'employeePayHistories',
      ],
    });

    return employee;
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
