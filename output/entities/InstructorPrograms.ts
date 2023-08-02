import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Batch } from "./Batch";
import { Employee } from "./Employee";
import { ProgramEntity } from "./ProgramEntity";

@Index(
  "instructor_programs_pk",
  ["batchId", "inproEmpEntityId", "inproEntityId"],
  { unique: true }
)
@Entity("instructor_programs", { schema: "bootcamp" })
export class InstructorPrograms {
  @Column("integer", { primary: true, name: "batch_id" })
  batchId: number;

  @Column("integer", { primary: true, name: "inpro_entity_id" })
  inproEntityId: number;

  @Column("integer", { primary: true, name: "inpro_emp_entity_id" })
  inproEmpEntityId: number;

  @Column("timestamp without time zone", {
    name: "inpro_modified_date",
    nullable: true,
  })
  inproModifiedDate: Date | null;

  @ManyToOne(() => Batch, (batch) => batch.instructorPrograms)
  @JoinColumn([{ name: "batch_id", referencedColumnName: "batchId" }])
  batch: Batch;

  @ManyToOne(() => Employee, (employee) => employee.instructorPrograms)
  @JoinColumn([
    { name: "inpro_emp_entity_id", referencedColumnName: "empEntityId" },
  ])
  inproEmpEntity: Employee;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.instructorPrograms
  )
  @JoinColumn([
    { name: "inpro_entity_id", referencedColumnName: "progEntityId" },
  ])
  inproEntity: ProgramEntity;
}
