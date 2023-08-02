import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { Status } from "./Status";
import { Users } from "./Users";

@Index("program_apply_pk", ["prapProgEntityId", "prapUserEntityId"], {
  unique: true,
})
@Entity("program_apply", { schema: "bootcamp" })
export class ProgramApply {
  @Column("integer", { primary: true, name: "prap_user_entity_id" })
  prapUserEntityId: number;

  @Column("integer", { primary: true, name: "prap_prog_entity_id" })
  prapProgEntityId: number;

  @Column("integer", { name: "prap_test_score", nullable: true })
  prapTestScore: number | null;

  @Column("integer", { name: "prap_gpa", nullable: true })
  prapGpa: number | null;

  @Column("integer", { name: "prap_iq_test", nullable: true })
  prapIqTest: number | null;

  @Column("character varying", {
    name: "prap_review",
    nullable: true,
    length: 256,
  })
  prapReview: string | null;

  @Column("timestamp without time zone", {
    name: "prap_modified_date",
    nullable: true,
  })
  prapModifiedDate: Date | null;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.programApplies
  )
  @JoinColumn([
    { name: "prap_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  prapProgEntity: ProgramEntity;

  @ManyToOne(() => Status, (status) => status.programApplies)
  @JoinColumn([{ name: "prap_status", referencedColumnName: "status" }])
  prapStatus: Status;

  @ManyToOne(() => Users, (users) => users.programApplies)
  @JoinColumn([
    { name: "prap_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  prapUserEntity: Users;
}
