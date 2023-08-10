import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TalentController } from './talent/talent.controller';
import { AppService } from './app.service';
import { TalentService } from './talent/talent.service';
import { TalentModule } from './talent/talent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '25651612',
      database: 'revampdb',
      entities: ['dist/output/entities/*.js'],
      autoLoadEntities: true,
    }),
    TalentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
