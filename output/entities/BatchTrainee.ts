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

@Index("batch_trainee_pk", ["batrBatchId", "batrId"], { unique: true })
@Entity("batch_trainee", { schema: "bootcamp" })
export class BatchTrainee {
  @PrimaryGeneratedColumn({ type: "integer", name: "batr_id" })
  batrId: number;

  @Column("character varying", {
    name: "batr_status",
    nullable: true,
    length: 15,
  })
  batrStatus: string | null;

  @Column("character", { name: "batr_certificated", nullable: true, length: 1 })
  batrCertificated: string | null;

  @Column("character varying", {
    name: "batre_certificate_link",
    nullable: true,
    length: 255,
  })
  batreCertificateLink: string | null;

  @Column("character varying", {
    name: "batr_access_token",
    nullable: true,
    length: 255,
  })
  batrAccessToken: string | null;

  @Column("character", { name: "batr_access_grant", nullable: true, length: 1 })
  batrAccessGrant: string | null;

  @Column("character varying", {
    name: "batr_review",
    nullable: true,
    length: 1024,
  })
  batrReview: string | null;

  @Column("integer", { name: "batr_total_score", nullable: true })
  batrTotalScore: number | null;

  @Column("timestamp without time zone", {
    name: "batr_modified_date",
    nullable: true,
  })
  batrModifiedDate: Date | null;

  @Column("integer", { primary: true, name: "batr_batch_id" })
  batrBatchId: number;

  @ManyToOne(() => Batch, (batch) => batch.batchTrainees)
  @JoinColumn([{ name: "batr_batch_id", referencedColumnName: "batchId" }])
  batrBatch: Batch;

  @ManyToOne(() => Users, (users) => users.batchTrainees)
  @JoinColumn([
    { name: "batr_trainee_entity_id", referencedColumnName: "userEntityId" },
  ])
  batrTraineeEntity: Users;
}
