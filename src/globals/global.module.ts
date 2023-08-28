/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

import { Users } from 'output/entities/Users';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersPhones } from 'output/entities/UsersPhones';
import { PhoneNumberType } from 'output/entities/PhoneNumberType';
import { UsersRoles } from 'output/entities/UsersRoles';
import { Roles } from 'output/entities/Roles';
import { UsersAddress } from 'output/entities/UsersAddress';
import { Address } from 'output/entities/Address';
import { AddressType } from 'output/entities/AddressType';
import { City } from 'output/entities/City';
import { UsersSkill } from 'output/entities/UsersSkill';
import { SkillType } from 'output/entities/SkillType';

import { LocalGuard } from 'src/auth/local/local.guard';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UploadMulter } from 'src/multer/multer';
import { UsersExperiences } from 'output/entities/UsersExperiences';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      BusinessEntity,
      UsersEducation,
      UsersEmail,
      UsersPhones,
      PhoneNumberType,
      UsersRoles,
      UsersAddress,
      Roles,
      Address,
      AddressType,
      City,
      UsersEducation,
      UsersExperiences,
      UsersSkill,
      SkillType,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({ secret: 'miniproject' }),
  ],
  providers: [UsersService, LocalGuard, JwtGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class GlobalModule {}
