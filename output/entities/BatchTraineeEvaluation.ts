import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Batch } from "./Batch";
import { Users } from "./Users";

@Index("batch_trainee_evaluation_pkey", ["btevId"], { unique: true })
@Entity("batch_trainee_evaluation", { schema: "bootcamp" })
export class BatchTraineeEvaluation {
  @PrimaryGeneratedColumn({ type: "integer", name: "btev_id" })
  btevId: number;

  @Column("character varying", {
    name: "btev_type",
    nullable: true,
    length: 15,
  })
  btevType: string | null;

  @Column("character varying", {
    name: "btev_header",
    nullable: true,
    length: 256,
  })
  btevHeader: string | null;

  @Column("character varying", {
    name: "btev_section",
    nullable: true,
    length: 256,
  })
  btevSection: string | null;

  @Column("character varying", {
    name: "btev_skill",
    nullable: true,
    length: 256,
  })
  btevSkill: string | null;

  @Column("integer", { name: "btev_week", nullable: true })
  btevWeek: number | null;

  @Column("integer", { name: "btev_skor", nullable: true })
  btevSkor: number | null;

  @Column("character varying", {
    name: "btev_note",
    nullable: true,
    length: 256,
  })
  btevNote: string | null;

  @Column("timestamp without time zone", {
    name: "btev_modified_date",
    nullable: true,
  })
  btevModifiedDate: Date | null;

  @ManyToOne(() => Batch, (batch) => batch.batchTraineeEvaluations)
  @JoinColumn([{ name: "btev_batch_id", referencedColumnName: "batchId" }])
  btevBatch: Batch;

  @ManyToOne(() => Users, (users) => users.batchTraineeEvaluations)
  @JoinColumn([
    { name: "btev_trainee_entity_id", referencedColumnName: "userEntityId" },
  ])
  btevTraineeEntity: Users;
}
