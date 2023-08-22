/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { Repository } from 'typeorm';
import { PaginationOptions } from './dto/pagination.dto';
import { EmployeeInterface } from './employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private serviceEmp: Repository<Employee>,
    @InjectRepository(EmployeePayHistory)
    private serviceEmpPayHistory: Repository<EmployeePayHistory>,
    @InjectRepository(EmployeeDepartmentHistory)
    private serviceEmpDeptHistory: Repository<EmployeeDepartmentHistory>,
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
  ) {}

  // Find One Employee
  public async findOneEmployee(id: number) {
    const employee = await this.serviceEmp.findOne({
      relations: [
        'empEntity',
        'batches',
      ],
      where: { empEntityId: id },
    });
    return employee;
  }

  // Get All Employee
  public async findAll(options: PaginationOptions): Promise<EmployeeInterface> {
    const queryBuilder = this.serviceEmp.createQueryBuilder('employee');

    queryBuilder
      .leftJoinAndSelect('employee.empEntity', 'empEntity')
      .leftJoinAndSelect('employee.employeeClientContracts', 'ecc')
      .leftJoinAndSelect('ecc.eccoStatus', 'eccoStatus')
      .leftJoinAndSelect('employee.employeeDepartmentHistories', 'edh')
      .leftJoinAndSelect('edh.edhiDept', 'edhiDept')
      .leftJoinAndSelect('employee.employeePayHistories', 'eph');

    const countQueryBuilder = this.serviceEmp.createQueryBuilder('employee');
    const totalCount = await countQueryBuilder.getCount();

    const employee = await queryBuilder.getMany();

    return {
      totalCount,
      page: options.page,
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
