/* eslint-disable prettier/prettier */
import { Employee } from 'output/entities/Employee';
import { EmployeeClientContract } from 'output/entities/EmployeeClientContract';

export class EmployeeInterface {
  data: Employee[];
  page: number;
  limit: number;
  totalCount: number;
}
