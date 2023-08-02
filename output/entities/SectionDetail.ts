import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sections } from "./Sections";
import { SectionDetailMaterial } from "./SectionDetailMaterial";

@Index("section_detail_pkey", ["secdId"], { unique: true })
@Entity("section_detail", { schema: "curriculum" })
export class SectionDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "secd_id" })
  secdId: number;

  @Column("character varying", {
    name: "secd_title",
    nullable: true,
    length: 256,
  })
  secdTitle: string | null;

  @Column("character", { name: "secd_preview", nullable: true, length: 1 })
  secdPreview: string | null;

  @Column("integer", { name: "secd_score", nullable: true })
  secdScore: number | null;

  @Column("character varying", {
    name: "secd_note",
    nullable: true,
    length: 256,
  })
  secdNote: string | null;

  @Column("integer", { name: "secd_minute", nullable: true })
  secdMinute: number | null;

  @Column("timestamp without time zone", {
    name: "secd_modified_date",
    nullable: true,
  })
  secdModifiedDate: Date | null;

  @ManyToOne(() => Sections, (sections) => sections.sectionDetails)
  @JoinColumn([{ name: "secd_sect_id", referencedColumnName: "sectId" }])
  secdSect: Sections;

  @OneToMany(
    () => SectionDetailMaterial,
    (sectionDetailMaterial) => sectionDetailMaterial.sedmSecd
  )
  sectionDetailMaterials: SectionDetailMaterial[];
}
