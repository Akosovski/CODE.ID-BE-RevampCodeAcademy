import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Employee } from "./Employee";

@Index("entity_pay_history", ["ephiEntityId", "ephiRateChangeDate"], {
  unique: true,
})
@Entity("employee_pay_history", { schema: "hr" })
export class EmployeePayHistory {
  @Column("integer", { primary: true, name: "ephi_entity_id" })
  ephiEntityId: number;

  @Column("timestamp without time zone", {
    primary: true,
    name: "ephi_rate_change_date",
  })
  ephiRateChangeDate: Date;

  @Column("integer", { name: "ephi_rate_salary", nullable: true })
  ephiRateSalary: number | null;

  @Column("smallint", { name: "ephi_pay_frequence", nullable: true })
  ephiPayFrequence: number | null;

  @Column("timestamp without time zone", {
    name: "ephi_modified_date",
    nullable: true,
  })
  ephiModifiedDate: Date | null;

  @ManyToOne(() => Employee, (employee) => employee.employeePayHistories)
  @JoinColumn([{ name: "ephi_entity_id", referencedColumnName: "empEntityId" }])
  ephiEntity: Employee;
}
