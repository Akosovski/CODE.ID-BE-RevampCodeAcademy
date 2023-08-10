import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentController } from './talent.controller';
import { TalentService } from './talent.service';
import { Employee } from 'output/entities/Employee';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [TalentController],
  providers: [TalentService],
})
export class TalentModule {}
