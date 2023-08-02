import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeDepartmentHistory } from "./EmployeeDepartmentHistory";

@Index("department_pkey", ["deptId"], { unique: true })
@Index("department_dept_name_key", ["deptName"], { unique: true })
@Entity("department", { schema: "hr" })
export class Department {
  @PrimaryGeneratedColumn({ type: "integer", name: "dept_id" })
  deptId: number;

  @Column("character varying", {
    name: "dept_name",
    nullable: true,
    unique: true,
    length: 50,
  })
  deptName: string | null;

  @Column("timestamp without time zone", {
    name: "dept_modified_date",
    nullable: true,
  })
  deptModifiedDate: Date | null;

  @OneToMany(
    () => EmployeeDepartmentHistory,
    (employeeDepartmentHistory) => employeeDepartmentHistory.edhiDept
  )
  employeeDepartmentHistories: EmployeeDepartmentHistory[];
}
