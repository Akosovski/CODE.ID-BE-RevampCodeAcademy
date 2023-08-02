import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Batch } from "./Batch";
import { Users } from "./Users";
import { JobRole } from "./JobRole";
import { EmployeeClientContract } from "./EmployeeClientContract";
import { EmployeeDepartmentHistory } from "./EmployeeDepartmentHistory";
import { EmployeePayHistory } from "./EmployeePayHistory";
import { InstructorPrograms } from "./InstructorPrograms";
import { JobPost } from "./JobPost";
import { ProgramApplyProgress } from "./ProgramApplyProgress";
import { ProgramEntity } from "./ProgramEntity";

@Index("employee_emp_emp_number_key", ["empEmpNumber"], { unique: true })
@Index("employee_pkey", ["empEntityId"], { unique: true })
@Index("employee_emp_national_id_key", ["empNationalId"], { unique: true })
@Entity("employee", { schema: "hr" })
export class Employee {
  @Column("integer", { primary: true, name: "emp_entity_id" })
  empEntityId: number;

  @Column("character varying", {
    name: "emp_emp_number",
    nullable: true,
    unique: true,
    length: 25,
  })
  empEmpNumber: string | null;

  @Column("character varying", {
    name: "emp_national_id",
    nullable: true,
    unique: true,
    length: 25,
  })
  empNationalId: string | null;

  @Column("date", { name: "emp_birth_date", nullable: true })
  empBirthDate: string | null;

  @Column("character", {
    name: "emp_marital_status",
    nullable: true,
    length: 1,
  })
  empMaritalStatus: string | null;

  @Column("character", { name: "emp_gender", nullable: true, length: 1 })
  empGender: string | null;

  @Column("timestamp without time zone", {
    name: "emp_hire_date",
    nullable: true,
  })
  empHireDate: Date | null;

  @Column("character", { name: "emp_salaried_flag", nullable: true, length: 1 })
  empSalariedFlag: string | null;

  @Column("smallint", { name: "emp_vacation_hours", nullable: true })
  empVacationHours: number | null;

  @Column("smallint", { name: "emp_sickleave_hours", nullable: true })
  empSickleaveHours: number | null;

  @Column("smallint", { name: "emp_current_flag", nullable: true })
  empCurrentFlag: number | null;

  @Column("timestamp without time zone", {
    name: "emp_modified_date",
    nullable: true,
  })
  empModifiedDate: Date | null;

  @Column("character varying", { name: "emp_type", nullable: true, length: 15 })
  empType: string | null;

  @OneToMany(() => Batch, (batch) => batch.batchPic)
  batches: Batch[];

  @ManyToOne(() => Employee, (employee) => employee.employees)
  @JoinColumn([
    { name: "emp_emp_entity_id", referencedColumnName: "empEntityId" },
  ])
  empEmpEntity: Employee;

  @OneToMany(() => Employee, (employee) => employee.empEmpEntity)
  employees: Employee[];

  @OneToOne(() => Users, (users) => users.employee)
  @JoinColumn([{ name: "emp_entity_id", referencedColumnName: "userEntityId" }])
  empEntity: Users;

  @ManyToOne(() => JobRole, (jobRole) => jobRole.employees)
  @JoinColumn([{ name: "emp_joro_id", referencedColumnName: "joroId" }])
  empJoro: JobRole;

  @OneToMany(
    () => EmployeeClientContract,
    (employeeClientContract) => employeeClientContract.eccoAccountManager
  )
  employeeClientContracts: EmployeeClientContract[];

  @OneToMany(
    () => EmployeeClientContract,
    (employeeClientContract) => employeeClientContract.eccoEntity
  )
  employeeClientContracts2: EmployeeClientContract[];

  @OneToMany(
    () => EmployeeDepartmentHistory,
    (employeeDepartmentHistory) => employeeDepartmentHistory.edhiEntity
  )
  employeeDepartmentHistories: EmployeeDepartmentHistory[];

  @OneToMany(
    () => EmployeePayHistory,
    (employeePayHistory) => employeePayHistory.ephiEntity
  )
  employeePayHistories: EmployeePayHistory[];

  @OneToMany(
    () => InstructorPrograms,
    (instructorPrograms) => instructorPrograms.inproEmpEntity
  )
  instructorPrograms: InstructorPrograms[];

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoEmpEntity)
  jobPosts: JobPost[];

  @OneToMany(
    () => ProgramApplyProgress,
    (programApplyProgress) => programApplyProgress.parogEmpEntity
  )
  programApplyProgresses: ProgramApplyProgress[];

  @OneToMany(
    () => ProgramEntity,
    (programEntity) => programEntity.progCreatedBy
  )
  programEntities: ProgramEntity[];
}
