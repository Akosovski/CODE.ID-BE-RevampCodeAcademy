import { Controller, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TalentService } from './talent.service';
import { Employee } from 'output/entities/Employee';

@Controller('talent')
export class TalentController {
  constructor(private TalentService: TalentService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.TalentService.findAll();
  }
}
