import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TalentController } from './talent/talent.controller';
import { TalentService } from './talent/talent.service';

@Module({
  imports: [],
  controllers: [AppController, TalentController],
  providers: [AppService, TalentService],
})
export class AppModule {}
