import { Injectable } from '@nestjs/common';
import { RoomI } from './talent.interface';

@Injectable()
export class TalentService {
  private readonly roomI: RoomI[] = [];

  findAll(): RoomI[] {
    return this.roomI;
  }
}
