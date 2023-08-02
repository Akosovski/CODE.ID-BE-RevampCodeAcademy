import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";

@Index("employee_range_pkey", ["emraId"], { unique: true })
@Index("employee_range_emra_range_max_key", ["emraRangeMax"], { unique: true })
@Index("employee_range_emra_range_min_key", ["emraRangeMin"], { unique: true })
@Entity("employee_range", { schema: "jobhire" })
export class EmployeeRange {
  @PrimaryGeneratedColumn({ type: "integer", name: "emra_id" })
  emraId: number;

  @Column("integer", { name: "emra_range_min", nullable: true, unique: true })
  emraRangeMin: number | null;

  @Column("integer", { name: "emra_range_max", nullable: true, unique: true })
  emraRangeMax: number | null;

  @Column("timestamp without time zone", {
    name: "emra_modified_date",
    nullable: true,
  })
  emraModifiedDate: Date | null;

  @OneToMany(() => Client, (client) => client.clitEmra)
  clients: Client[];
}
