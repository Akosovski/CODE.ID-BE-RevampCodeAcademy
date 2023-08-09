import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'output/entities/Employee';

@Injectable()
export class TalentService {
  public employees: Employee[] = [];
  findAll(): Employee[] {
    return this.employees;
  }
}
