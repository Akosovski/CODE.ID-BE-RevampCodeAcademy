/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { Client } from "./Client";
import { JobType } from "./JobType";
import { Status } from "./Status";

@Index("employee_cl_pk", ["eccoEntityId", "eccoId"], { unique: true })
@Entity("employee_client_contract", { schema: "hr" })
export class EmployeeClientContract {
  @PrimaryGeneratedColumn({ type: "integer", name: "ecco_id" })
  eccoId: number;

  @Column("integer", { primary: true, name: "ecco_entity_id" })
  eccoEntityId: number;

  @Column("character varying", {
    name: "ecco_contract_no",
    nullable: true,
    length: 55,
  })
  eccoContractNo: string | null;

  @Column("timestamp without time zone", {
    name: "ecco_contract_date",
    nullable: true,
  })
  eccoContractDate: Date | null;

  @Column("timestamp without time zone", {
    name: "ecco_start_date",
    nullable: true,
  })
  eccoStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "ecco_end_date",
    nullable: true,
  })
  eccoEndDate: Date | null;

  @Column("character varying", {
    name: "ecco_notes",
    nullable: true,
    length: 512,
  })
  eccoNotes: string | null;

  @Column("timestamp without time zone", {
    name: "ecco_modified_date",
    nullable: true,
  })
  eccoModifiedDate: Date | null;

  @Column("character varying", {
    name: "ecco_media_link",
    nullable: true,
    length: 255,
  })
  eccoMediaLink: string | null;

  @ManyToOne(() => Employee, (employee) => employee.employeeClientContracts)
  @JoinColumn([
    { name: "ecco_account_manager", referencedColumnName: "empEntityId" },
  ])
  eccoAccountManager: Employee;

  @ManyToOne(() => Client, (client) => client.employeeClientContracts)
  @JoinColumn([{ name: "ecco_clit_id", referencedColumnName: "clitId" }])
  eccoClit: Client;

  @ManyToOne(() => Employee, (employee) => employee.employeeClientContracts2)
  @JoinColumn([{ name: "ecco_entity_id", referencedColumnName: "empEntityId" }])
  eccoEntity: Employee;

  @ManyToOne(() => JobType, (jobType) => jobType.employeeClientContracts)
  @JoinColumn([{ name: "ecco_joty_id", referencedColumnName: "jotyId" }])
  eccoJoty: JobType;

  @ManyToOne(() => Status, (status) => status.employeeClientContracts)
  @JoinColumn([{ name: "ecco_status", referencedColumnName: "status" }])
  eccoStatus: Status;
}
