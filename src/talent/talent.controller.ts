import { Controller, Get } from '@nestjs/common';
import { TalentService } from './talent.service';
import { RoomI } from './talent.interface';

@Controller('talent')
export class TalentController {
  constructor(private TalentService: TalentService) {}
  @Get()
  async findAll(): Promise<RoomI[]> {
    return this.TalentService.findAll();
  }
}
