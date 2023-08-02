import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TalentApply } from "./TalentApply";

@Index("talentprogress", ["taapEntityId", "taapUserEntityId", "taprId"], {
  unique: true,
})
@Entity("talent_apply_progress", { schema: "jobhire" })
export class TalentApplyProgress {
  @PrimaryGeneratedColumn({ type: "integer", name: "tapr_id" })
  taprId: number;

  @Column("integer", { primary: true, name: "taap_user_entity_id" })
  taapUserEntityId: number;

  @Column("integer", { primary: true, name: "taap_entity_id" })
  taapEntityId: number;

  @Column("timestamp without time zone", {
    name: "tapr_modified_date",
    nullable: true,
  })
  taprModifiedDate: Date | null;

  @Column("character varying", {
    name: "tapr_status",
    nullable: true,
    length: 15,
  })
  taprStatus: string | null;

  @Column("character varying", {
    name: "tapr_comment",
    nullable: true,
    length: 256,
  })
  taprComment: string | null;

  @Column("character varying", {
    name: "tapr_progress_name",
    nullable: true,
    length: 55,
  })
  taprProgressName: string | null;

  @ManyToOne(
    () => TalentApply,
    (talentApply) => talentApply.talentApplyProgresses
  )
  @JoinColumn([
    { name: "taap_user_entity_id", referencedColumnName: "taapUserEntityId" },
  ])
  taapUserEntity: TalentApply;

  @ManyToOne(
    () => TalentApply,
    (talentApply) => talentApply.talentApplyProgresses2
  )
  @JoinColumn([
    { name: "taap_entity_id", referencedColumnName: "taapEntityId" },
  ])
  taapEntity: TalentApply;
}
