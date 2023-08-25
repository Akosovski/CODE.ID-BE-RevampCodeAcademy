/* eslint-disable prettier/prettier */
import { Users } from 'output/entities/Users';

export class UsersInterface {
  data: Users[];
  page: number;
  totalCount: number;
}