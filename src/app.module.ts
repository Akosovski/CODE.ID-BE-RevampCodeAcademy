import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentController } from './talent/talent.controller';
import { TalentService } from './talent/talent.service';
import { Employee } from 'output/entities/Employee';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '25651612',
      database: 'revampdb',
      entities: ['output/entities/*.js'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [AppController, TalentController],
  providers: [AppService, TalentService],
})
export class AppModule {}
