/* eslint-disable prettier/prettier */
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';

export class EmployeeInterface {
  data: Employee[];
  page: number;
  totalCount: number;
}

export class UsersInterface {
  data: Users[];
  page: number;
  totalCount: number;
}
