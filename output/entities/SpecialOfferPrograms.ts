import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { SpecialOffer } from "./SpecialOffer";

@Index(
  "special_offer_programs_pk",
  ["socoId", "socoProgEntityId", "socoSpofId"],
  { unique: true }
)
@Entity("special_offer_programs", { schema: "sales" })
export class SpecialOfferPrograms {
  @PrimaryGeneratedColumn({ type: "integer", name: "soco_id" })
  socoId: number;

  @PrimaryGeneratedColumn({ type: "integer", name: "soco_spof_id" })
  socoSpofId: number;

  @Column("integer", { primary: true, name: "soco_prog_entity_id" })
  socoProgEntityId: number;

  @Column("character varying", {
    name: "soco_status",
    nullable: true,
    length: 15,
  })
  socoStatus: string | null;

  @Column("timestamp without time zone", {
    name: "soco_modified_date",
    nullable: true,
  })
  socoModifiedDate: Date | null;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.specialOfferPrograms
  )
  @JoinColumn([
    { name: "soco_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  socoProgEntity: ProgramEntity;

  @ManyToOne(
    () => SpecialOffer,
    (specialOffer) => specialOffer.specialOfferPrograms
  )
  @JoinColumn([{ name: "soco_spof_id", referencedColumnName: "spofId" }])
  socoSpof: SpecialOffer;
}
