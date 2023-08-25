/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { EmployeeClientContract } from 'output/entities/EmployeeClientContract';
import { Repository } from 'typeorm';
import { PaginationOptions } from './dto/pagination.dto';
import { UsersInterface } from './talent.interface';

@Injectable()
export class TalentService {
  constructor(
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(EmployeeClientContract)
    private serviceECC: Repository<EmployeeClientContract>,
  ) {}

  // Get All Talents
  public async getAll(options: PaginationOptions): Promise<UsersInterface> {
    const queryBuilder = this.serviceUsers.createQueryBuilder('talents');

    queryBuilder
      .leftJoinAndSelect('talents.batchTrainees', 'batchTrainees') // Join to Batch Trainees
      .leftJoinAndSelect('batchTrainees.batrBatch', 'batrBatch') // Join to Batch
      .addSelect(['batrBatch.batchName']) // Get Batch Name
      .leftJoin('batrBatch.batchEntity', 'batchEntity') // Join to Program Entity
      .addSelect(['batchEntity.progTitle']) // Get Program Title
      .orderBy('talents.userCurrentRole', 'DESC')
  
    queryBuilder.where('talents.userCurrentRole IN (:...roles)', { roles: [1, 2, 12, 13] });

    // Seperate Query to Count the Totals
    const countQueryBuilder = this.serviceUsers.createQueryBuilder('talents');
    countQueryBuilder.where('talents.userCurrentRole IN (:...roles)', { roles: [1, 2, 12, 13] });
    const totalCount = await countQueryBuilder.getCount();

    const talents = await queryBuilder.getMany();

    return {
      totalCount,
      page: options.page,
      data: talents,
    };
  }

  // Search Talents
  public async search(options: PaginationOptions): Promise<UsersInterface> {
    const queryBuilder = this.serviceUsers.createQueryBuilder('talents');
    const countQueryBuilder = this.serviceUsers.createQueryBuilder('talents');

    queryBuilder
        .leftJoinAndSelect('talents.batchTrainees', 'batchTrainees') // Join to Batch Trainees
        .leftJoinAndSelect('batchTrainees.batrBatch', 'batrBatch') // Join to Batch
        .addSelect(['batrBatch.batchName']) // Get Batch Name
        .leftJoin('batrBatch.batchEntity', 'batchEntity') // Join to Program Entity
        .addSelect(['batchEntity.progTitle']) // Get Program Title
        .orderBy('talents.userCurrentRole', 'DESC');
    
    // Search Conditions
    if (options.name && options.status) {
      queryBuilder.andWhere('talents.userFirstName LIKE :userFirstName', { userFirstName: `%${options.name}%` });
      queryBuilder.andWhere('talents.userCurrentRole = :userCurrentRole', { userCurrentRole: options.status });

      countQueryBuilder.andWhere('talents.userFirstName LIKE :userFirstName', { userFirstName: `%${options.name}%` });
      countQueryBuilder.andWhere('talents.userCurrentRole = :userCurrentRole', { userCurrentRole: options.status });
    }

    if (options.status && !options.name) {
      queryBuilder.andWhere('talents.userCurrentRole = :userCurrentRole', { userCurrentRole: options.status });
      countQueryBuilder.andWhere('talents.userCurrentRole = :userCurrentRole', { userCurrentRole: options.status });
    }

    if (!options.status && options.name) {
      queryBuilder.andWhere('talents.userFirstName LIKE :userFirstName', { userFirstName: `%${options.name}%` });
      countQueryBuilder.andWhere('talents.userFirstName LIKE :userFirstName', { userFirstName: `%${options.name}%` });
    }

    queryBuilder.andWhere('talents.userCurrentRole IN (:...roles)', { roles: [1, 2, 12, 13] });
    countQueryBuilder.andWhere('talents.userCurrentRole IN (:...roles)', { roles: [1, 2, 12, 13] });

    const totalCount = await countQueryBuilder.getCount();
    const talents = await queryBuilder.getMany();

    return {
        totalCount,
        page: options.page,
        data: talents,
    };
  }

  // Get One Talent According to ID
  public async findOneTalent(id: number) {
    const queryBuilder = this.serviceUsers.createQueryBuilder('talents')
      .where('talents.userEntityId = :id', { id })
      .leftJoinAndSelect('talents.usersEmails', 'usersEmails')
      .leftJoinAndSelect('talents.usersPhones', 'usersPhones')
      .leftJoinAndSelect('talents.batchTrainees', 'batchTrainees') // Join to Batch Trainees
      .leftJoinAndSelect('batchTrainees.batrBatch', 'batrBatch') // Join to Batch
      .leftJoin('batrBatch.batchEntity', 'batchEntity') // Join to Program Entity
      .addSelect(['batchEntity.progTitle']) // Get Program Title
      .orderBy('talents.userEntityId', 'ASC')
  
    const talent = await queryBuilder.getOne();
    return talent;
  }

  // Update Talent Role (Status)
  public async updateTalentRole(id: number, newRole: number, editedDate: string) {
    try {
      await this.serviceUsers
        .createQueryBuilder()
        .update(Users)
        .set({ userCurrentRole: newRole, userModifiedDate: editedDate })
        .where('userEntityId = :id', { id })
        .execute();
  
      const updatedTalent = await this.findOneTalent(id);
      return updatedTalent;
    } catch (error) {
      throw new Error(`Failed to update talent: ${error.message}`);
    }
  }
  
  // Create Client Contract
  public async createEmployeeClientContract(id: number, ContractDetailsDto: any) {
    
    const newContract = this.serviceECC.create({
      eccoEntityId: id,
      eccoClit: ContractDetailsDto.contractClient,
      eccoContractNo: ContractDetailsDto.contractNo,
      eccoContractDate: ContractDetailsDto.startDate,
      eccoStartDate: ContractDetailsDto.startDate,
      eccoEndDate: ContractDetailsDto.endDate,
      eccoNotes: ContractDetailsDto.notes,
    });

    const savedContract = await this.serviceECC.save(newContract);
  
    return savedContract;
  }

}
