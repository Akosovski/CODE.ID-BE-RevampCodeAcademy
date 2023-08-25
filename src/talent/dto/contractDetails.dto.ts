/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class ContractDetailsDto {
  @IsNotEmpty()
  @IsString()
  contractClient: number;

  @IsNotEmpty()
  @IsString()
  contractNo: string;

  @IsNotEmpty()
  @IsDateString()
  contractDate: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsString()
  notes: string;
}