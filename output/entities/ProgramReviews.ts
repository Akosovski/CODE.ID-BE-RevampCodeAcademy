import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { Users } from "./Users";

@Index("prow_user_entity_id", ["prowProgEntityId", "prowUserEntityId"], {
  unique: true,
})
@Entity("program_reviews", { schema: "curriculum" })
export class ProgramReviews {
  @Column("integer", { primary: true, name: "prow_user_entity_id" })
  prowUserEntityId: number;

  @Column("integer", { primary: true, name: "prow_prog_entity_id" })
  prowProgEntityId: number;

  @Column("character varying", {
    name: "prow_review",
    nullable: true,
    length: 512,
  })
  prowReview: string | null;

  @Column("integer", { name: "prow_rating", nullable: true })
  prowRating: number | null;

  @Column("timestamp without time zone", {
    name: "prow_modified_date",
    nullable: true,
  })
  prowModifiedDate: Date | null;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.programReviews
  )
  @JoinColumn([
    { name: "prow_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  prowProgEntity: ProgramEntity;

  @ManyToOne(() => Users, (users) => users.programReviews)
  @JoinColumn([
    { name: "prow_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  prowUserEntity: Users;
}
