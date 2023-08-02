import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { Employee } from "./Employee";
import { Status } from "./Status";
import { BatchTrainee } from "./BatchTrainee";
import { BatchTraineeEvaluation } from "./BatchTraineeEvaluation";
import { InstructorPrograms } from "./InstructorPrograms";

@Index("batch_pk", ["batchEntityId", "batchId"], { unique: true })
@Index("batch_batch_id_key", ["batchId"], { unique: true })
@Index("batch_batch_name_key", ["batchName"], { unique: true })
@Entity("batch", { schema: "bootcamp" })
export class Batch {
  @PrimaryGeneratedColumn({ type: "integer", name: "batch_id" })
  batchId: number;

  @Column("integer", { primary: true, name: "batch_entity_id" })
  batchEntityId: number;

  @Column("character varying", {
    name: "batch_name",
    nullable: true,
    unique: true,
    length: 15,
  })
  batchName: string | null;

  @Column("character varying", {
    name: "batch_description",
    nullable: true,
    length: 125,
  })
  batchDescription: string | null;

  @Column("timestamp without time zone", {
    name: "batch_start_date",
    nullable: true,
  })
  batchStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "batch_end_date",
    nullable: true,
  })
  batchEndDate: Date | null;

  @Column("character varying", {
    name: "batch_reason",
    nullable: true,
    length: 256,
  })
  batchReason: string | null;

  @Column("character varying", {
    name: "batch_type",
    nullable: true,
    length: 15,
  })
  batchType: string | null;

  @Column("timestamp without time zone", {
    name: "batch_modified_date",
    nullable: true,
  })
  batchModifiedDate: Date | null;

  @ManyToOne(() => ProgramEntity, (programEntity) => programEntity.batches)
  @JoinColumn([
    { name: "batch_entity_id", referencedColumnName: "progEntityId" },
  ])
  batchEntity: ProgramEntity;

  @ManyToOne(() => Employee, (employee) => employee.batches)
  @JoinColumn([{ name: "batch_pic_id", referencedColumnName: "empEntityId" }])
  batchPic: Employee;

  @ManyToOne(() => Status, (status) => status.batches)
  @JoinColumn([{ name: "batch_status", referencedColumnName: "status" }])
  batchStatus: Status;

  @OneToMany(() => BatchTrainee, (batchTrainee) => batchTrainee.batrBatch)
  batchTrainees: BatchTrainee[];

  @OneToMany(
    () => BatchTraineeEvaluation,
    (batchTraineeEvaluation) => batchTraineeEvaluation.btevBatch
  )
  batchTraineeEvaluations: BatchTraineeEvaluation[];

  @OneToMany(
    () => InstructorPrograms,
    (instructorPrograms) => instructorPrograms.batch
  )
  instructorPrograms: InstructorPrograms[];
}
