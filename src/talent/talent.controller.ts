import { Controller, Get } from '@nestjs/common';
import { TalentService } from './talent.service';

@Controller('talent')
export class TalentController {
  constructor(private TalentService: TalentService) {}

  @Get()
  public async findAll() {
    return this.TalentService.findAll();
  }
}
