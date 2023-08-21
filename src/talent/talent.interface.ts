/* eslint-disable prettier/prettier */
import { Employee } from 'output/entities/Employee';

export class EmployeeInterface {
  data: Employee[];
  page: number;
  limit: number;
  totalCount: number;
}
