import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { JobPost } from "./JobPost";
import { Status } from "./Status";
import { Users } from "./Users";
import { TalentApplyProgress } from "./TalentApplyProgress";

@Index("talent_apply_taap_entity_id_key", ["taapEntityId"], { unique: true })
@Index("talentapply", ["taapEntityId", "taapUserEntityId"], { unique: true })
@Index("talent_apply_taap_user_entity_id_key", ["taapUserEntityId"], {
  unique: true,
})
@Entity("talent_apply", { schema: "jobhire" })
export class TalentApply {
  @Column("integer", { primary: true, name: "taap_user_entity_id" })
  taapUserEntityId: number;

  @Column("integer", { primary: true, name: "taap_entity_id" })
  taapEntityId: number;

  @Column("character varying", { name: "taap_intro", nullable: true })
  taapIntro: string | null;

  @Column("integer", { name: "taap_scoring", nullable: true })
  taapScoring: number | null;

  @Column("timestamp without time zone", {
    name: "taap_modified_date",
    nullable: true,
  })
  taapModifiedDate: Date | null;

  @OneToOne(() => JobPost, (jobPost) => jobPost.talentApply)
  @JoinColumn([
    { name: "taap_entity_id", referencedColumnName: "jopoEntityId" },
  ])
  taapEntity: JobPost;

  @ManyToOne(() => Status, (status) => status.talentApplies)
  @JoinColumn([{ name: "taap_status", referencedColumnName: "status" }])
  taapStatus: Status;

  @OneToOne(() => Users, (users) => users.talentApply)
  @JoinColumn([
    { name: "taap_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  taapUserEntity: Users;

  @OneToMany(
    () => TalentApplyProgress,
    (talentApplyProgress) => talentApplyProgress.taapUserEntity
  )
  talentApplyProgresses: TalentApplyProgress[];

  @OneToMany(
    () => TalentApplyProgress,
    (talentApplyProgress) => talentApplyProgress.taapEntity
  )
  talentApplyProgresses2: TalentApplyProgress[];
}
